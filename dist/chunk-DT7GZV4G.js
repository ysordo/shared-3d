import {
  useScene
} from "./chunk-AARDPV3F.js";

// src/react/components/VRButton.tsx
import { useEffect, useRef, useState } from "react";
import { VRButton as ThreeVRButton } from "three/examples/jsm/webxr/VRButton.js";
import { jsx } from "react/jsx-runtime";
var VRButton = ({
  children,
  className = "",
  onClick,
  ...restProps
}) => {
  const { renderer } = useScene();
  const buttonRef = useRef(null);
  const [isSupported, setIsSupported] = useState(null);
  useEffect(() => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const checkSupport = async () => {
      if ("xr" in navigator) {
        try {
          const supported = await navigator.xr.isSessionSupported(
            "immersive-vr"
          );
          setIsSupported(supported);
        } catch (e) {
          setIsSupported(false);
        }
      } else {
        setIsSupported(false);
      }
    };
    checkSupport();
    const vrButton = ThreeVRButton.createButton(renderer);
    vrButton.style.cssText = "";
    vrButton.className = "";
    Object.assign(vrButton.style, {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      background: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      zIndex: 10,
      display: "none",
      pointerEvents: !isSupported ? "none" : "auto"
    });
    if (buttonRef.current) {
      buttonRef.current.style.position = "relative";
      buttonRef.current.appendChild(vrButton);
      buttonRef.current.onclick = (e) => {
        vrButton.onclick?.(e);
        onClick?.(e);
      };
    }
    return () => {
      if (vrButton.parentNode) {
        vrButton.parentNode.removeChild(vrButton);
      }
    };
  }, [renderer, onClick]);
  const disabledClasses = !isSupported ? "opacity-40! cursor-not-allowed! grayscale!" : "";
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: buttonRef,
      className: `${disabledClasses} ${className}`,
      disabled: !isSupported,
      "aria-label": isSupported === false ? "VR not supported" : "Enter VR",
      ...restProps,
      children
    }
  );
};

export {
  VRButton
};
