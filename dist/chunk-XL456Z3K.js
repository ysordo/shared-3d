import {
  useScene
} from "./chunk-YXZQN2XJ.js";

// src/react/components/ARButton.tsx
import { useEffect } from "react";
import { ARButton as ThreeARButton } from "three/examples/jsm/webxr/ARButton.js";
var ARButton = () => {
  const { renderer } = useScene();
  useEffect(() => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = ThreeARButton.createButton(renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);
  return null;
};

export {
  ARButton
};
