import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/react/components/ARButton.tsx
import { useEffect } from "react";
import { ARButton as ThreeARButton } from "three/examples/jsm/webxr/ARButton.js";
var ARButton = () => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator || !orchestrator.renderer) {
      return;
    }
    orchestrator.renderer.xr.enabled = true;
    const button = ThreeARButton.createButton(orchestrator.renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [orchestrator, orchestrator?.renderer]);
  return null;
};

export {
  ARButton
};
