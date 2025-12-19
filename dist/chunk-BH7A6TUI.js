import {
  useScene
} from "./chunk-VVJCLYBD.js";

// src/react/components/VRButton.tsx
import { useEffect } from "react";
import { VRButton as ThreeVRButton } from "three/examples/jsm/webxr/VRButton.js";
var VRButton = () => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator || !orchestrator.renderer) {
      return;
    }
    orchestrator.renderer.xr.enabled = true;
    const button = ThreeVRButton.createButton(orchestrator.renderer);
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
  VRButton
};
