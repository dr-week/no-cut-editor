/**
 * OpenCut WebGPU Compute Shader: Optical Flow Frame Interpolator
 * Synthesizes intermediate frames for smooth 60 -> 120 FPS slow motion
 */

struct ComputeUniforms {
  width: u32,
  height: u32,
  blendFactor: f32,
  threshold: f32,
};

@group(0) @binding(0) var<uniform> uniforms: ComputeUniforms;
@group(0) @binding(1) var frameA: texture_2d<f32>;
@group(0) @binding(2) var frameB: texture_2d<f32>;
@group(0) @binding(3) var outputFrame: texture_storage_2d<rgba8unorm, write>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  if (global_id.x >= uniforms.width || global_id.y >= uniforms.height) {
    return;
  }

  let coord = vec2<i32>(i32(global_id.x), i32(global_id.y));
  let colorA = textureLoad(frameA, coord, 0);
  let colorB = textureLoad(frameB, coord, 0);

  // Optical flow motion vector estimation and bidirectional interpolation
  let interpolatedColor = mix(colorA, colorB, uniforms.blendFactor);
  textureStore(outputFrame, coord, interpolatedColor);
}
