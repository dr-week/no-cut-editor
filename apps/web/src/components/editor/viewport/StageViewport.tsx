import React, { useRef, useEffect } from "react";
import { Stage, Layer, Text as KonvaText, Transformer } from "react-konva";
import { Ratio, Maximize2 } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";
import { FramePipelineManager } from "#/lib/engine/FramePipelineManager";
import { WebGLShaderPipeline } from "#/lib/engine/WebGLShaderPipeline";
import { EditorEngine } from "#/lib/engine/EditorEngine";

interface StageViewportProps {
  aspectRatio: "16:9" | "9:16" | "1:1";
  setAspectRatio: (r: "16:9" | "9:16" | "1:1") => void;
}

export function StageViewport({ aspectRatio, setAspectRatio }: StageViewportProps) {
  const textElements = useEditorStore((s) => s.textElements);
  const selectedTextId = useEditorStore((s) => s.selectedTextId);
  const setSelectedTextId = useEditorStore((s) => s.setSelectedTextId);
  const updateTextElement = useEditorStore((s) => s.updateTextElement);

  // Lumetri values for WebGL GPU Shader pipeline
  const lift = useEditorStore((s) => s.lift);
  const gamma = useEditorStore((s) => s.gamma);
  const gain = useEditorStore((s) => s.gain);
  const activeLUT = useEditorStore((s) => s.activeLUT);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pipelineRef = useRef<WebGLShaderPipeline | null>(null);
  const trRef = useRef<any>(null);
  const selectedNodeRef = useRef<any>(null);

  const getStageDimensions = () => {
    if (aspectRatio === "9:16") return { width: 230, height: 410 };
    if (aspectRatio === "1:1") return { width: 380, height: 380 };
    return { width: 640, height: 360 };
  };

  const stageDim = getStageDimensions();

  // Initialize pure WebGL2 Video Layer (Decoupled Layer 1 with HiDPI support)
  useEffect(() => {
    if (canvasRef.current) {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvasRef.current.width = stageDim.width * dpr;
      canvasRef.current.height = stageDim.height * dpr;
      pipelineRef.current = new WebGLShaderPipeline(canvasRef.current);
    }
    return () => {
      pipelineRef.current?.destroy();
      pipelineRef.current = null;
    };
  }, [stageDim.width, stageDim.height]);

  // Subscribe WebGL Pipeline to decoded video frames
  useEffect(() => {
    const frameManager = FramePipelineManager.getInstance();
    const unsubscribe = frameManager.subscribe((frame) => {
      if (pipelineRef.current && frame.bitmap) {
        pipelineRef.current.renderFrame(frame.bitmap, { lift, gamma, gain, activeLUT });
      }
    });

    // Request initial frame
    frameManager.requestFrame(EditorEngine.getInstance().currentTime);

    return () => unsubscribe();
  }, [lift, gamma, gain, activeLUT]);

  // Attach Transformer to selected Konva element (Decoupled Layer 2)
  useEffect(() => {
    if (trRef.current && selectedNodeRef.current) {
      trRef.current.nodes([selectedNodeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedTextId]);

  return (
    <div className="flex-1 bg-[#090a0d] flex flex-col overflow-hidden">
      {/* Stage Top Bar: Aspect Ratio, Zoom & Resolution */}
      <div className="h-9 border-b border-neutral-800/80 bg-[#121317] px-4 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
            <Ratio className="w-3.5 h-3.5 text-cyan-400" /> Ratio:
          </span>
          {(["16:9", "9:16", "1:1"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setAspectRatio(r)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                aspectRatio === r ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40" : "bg-neutral-800 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-neutral-400 font-mono">100% Fit</span>
          <button className="hover:text-white transition"><Maximize2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Centered Dual-Layer Stage Container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
        <div 
          style={{ width: `${stageDim.width}px`, height: `${stageDim.height}px` }}
          className="bg-black rounded-lg shadow-2xl overflow-hidden border border-neutral-800 relative transition-all duration-200"
        >
          {/* Layer 1: Hardware-Accelerated WebGL2 Video Surface */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* Layer 2: Interactive Stage Overlay (Konva Text & Transformers) */}
          <Stage width={stageDim.width} height={stageDim.height} className="absolute inset-0">
            <Layer>
              {textElements.map((el) => (
                <KonvaText 
                  key={el.id} 
                  ref={selectedTextId === el.id ? selectedNodeRef : null}
                  text={el.text} 
                  x={el.x} 
                  y={el.y} 
                  fontSize={el.fontSize} 
                  fill={el.fill} 
                  draggable 
                  onClick={() => setSelectedTextId(el.id)}
                  onDragEnd={(e) => {
                    updateTextElement(el.id, { x: e.target.x(), y: e.target.y() });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    updateTextElement(el.id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY()
                    });
                  }}
                />
              ))}
              <Transformer 
                ref={trRef} 
                rotateEnabled={true} 
                anchorSize={8}
                anchorCornerRadius={2}
                anchorStroke="#06b6d4" 
                anchorFill="#ffffff" 
                borderStroke="#06b6d4" 
                borderDash={[3, 3]} 
                borderStrokeWidth={1}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
