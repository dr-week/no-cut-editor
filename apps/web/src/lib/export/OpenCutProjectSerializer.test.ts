import { describe, it, expect } from "vitest";
import { OpenCutProjectSerializer } from "./OpenCutProjectSerializer";
import { useEditorStore } from "../store/editorStore";

describe("OpenCutProjectSerializer (Save/Load)", () => {
  it("serializes and deserializes project state with full fidelity", () => {
    const state = useEditorStore.getState();
    
    // Serialize state
    const jsonString = OpenCutProjectSerializer.serialize(state, "Summer_Ad_2026");
    expect(jsonString).toBeDefined();
    expect(jsonString.includes("Summer_Ad_2026")).toBe(true);

    // Deserialize state
    const rehydrated = OpenCutProjectSerializer.deserialize(jsonString);
    expect(rehydrated.clips?.length).toBe(state.clips.length);
    expect(rehydrated.textElements?.length).toBe(state.textElements.length);
    expect(rehydrated.activeLUT).toBe(state.activeLUT);
  });
});
