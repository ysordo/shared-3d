import {
  useScene
} from "./chunk-J565G7BY.js";

// src/react/components/VRButton.tsx
import { useEffect } from "react";
import { VRButton as ThreeVRButton } from "three/examples/jsm/webxr/VRButton.js";
var VRButton = () => {
  const { renderer } = useScene();
  useEffect(() => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = ThreeVRButton.createButton(renderer);
    renderer.domElement.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);
  return null;
};

export {
  VRButton
};
