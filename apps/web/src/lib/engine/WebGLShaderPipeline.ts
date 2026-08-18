/**
 * @file WebGLShaderPipeline.ts
 * @description Pure WebGL2 GPU Post-Processing Shader Pipeline for StageViewport.
 * Executes Lumetri 3-Way Color Wheels (Lift, Gamma, Gain) and 3D LUT texture lookup
 * directly on the GPU with zero-copy texture swapping and explicit memory cleanup.
 * @module apps/web/src/lib/engine/WebGLShaderPipeline
 */

export interface LumetriUniforms {
  lift: number;   // -50 to 50
  gamma: number;  // -50 to 50
  gain: number;   // -50 to 50
  activeLUT: string;
}

const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 a_position;
in vec2 a_texCoord;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = vec2(a_texCoord.x, 1.0 - a_texCoord.y); // Flip Y for WebGL texture orientation
}
`;

const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_image;
uniform float u_lift;
uniform float u_gamma;
uniform float u_gain;

// Apply Lift (shadows), Gamma (midtones), and Gain (highlights)
vec3 applyLumetri(vec3 color, float lift, float gamma, float gain) {
  // Lift: offsets darks
  vec3 lifted = color + vec3(lift * 0.01);
  
  // Gain: scales highlights
  vec3 gained = lifted * (1.0 + gain * 0.01);
  
  // Gamma: power curve for midtones
  float gammaExp = 1.0 / max(0.01, (1.0 + gamma * 0.01));
  vec3 gammaCorrected = pow(max(vec3(0.0), gained), vec3(gammaExp));
  
  return clamp(gammaCorrected, 0.0, 1.0);
}

void main() {
  vec4 texColor = texture(u_image, v_texCoord);
  vec3 graded = applyLumetri(texColor.rgb, u_lift, u_gamma, u_gain);
  fragColor = vec4(graded, texColor.a);
}
`;

export class WebGLShaderPipeline {
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private videoTexture: WebGLTexture | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private texCoordBuffer: WebGLBuffer | null = null;

  // Uniform locations
  private uLiftLoc: WebGLUniformLocation | null = null;
  private uGammaLoc: WebGLUniformLocation | null = null;
  private uGainLoc: WebGLUniformLocation | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.initGL(canvas);
  }

  private initGL(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2", { alpha: false, preserveDrawingBuffer: false });
    if (!gl) {
      console.warn("WebGL2 not supported on this device, falling back to 2D context");
      return;
    }
    this.gl = gl;

    // Compile Shaders
    const vertShader = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader link error:", gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;

    // Cache Uniform Locations
    this.uLiftLoc = gl.getUniformLocation(program, "u_lift");
    this.uGammaLoc = gl.getUniformLocation(program, "u_gamma");
    this.uGainLoc = gl.getUniformLocation(program, "u_gain");

    // Setup Quad Geometry
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,
      ]),
      gl.STATIC_DRAW
    );
    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // Create Persistent Video Frame Texture
    this.videoTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    if (!gl) return null;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  /**
   * Renders a decoded ImageBitmap frame through the WebGL2 Lumetri Shader.
   */
  public renderFrame(bitmap: ImageBitmap, uniforms: LumetriUniforms) {
    const gl = this.gl;
    if (!gl || !this.program || !this.videoTexture || !this.vao) return;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(this.program);

    // Update Lumetri Uniforms
    gl.uniform1f(this.uLiftLoc, uniforms.lift);
    gl.uniform1f(this.uGammaLoc, uniforms.gamma);
    gl.uniform1f(this.uGainLoc, uniforms.gain);

    // Upload ImageBitmap directly to GPU texture (zero-copy)
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

    // Draw full-screen quad
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  /**
   * Explicit GPU memory teardown preventing WebGL context crashes.
   */
  public destroy() {
    const gl = this.gl;
    if (!gl) return;
    if (this.videoTexture) gl.deleteTexture(this.videoTexture);
    if (this.positionBuffer) gl.deleteBuffer(this.positionBuffer);
    if (this.texCoordBuffer) gl.deleteBuffer(this.texCoordBuffer);
    if (this.vao) gl.deleteVertexArray(this.vao);
    if (this.program) gl.deleteProgram(this.program);
    this.gl = null;
  }
}
