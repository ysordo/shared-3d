import {
  useScene
} from "./chunk-NHJD6U4Z.js";

// src/react/components/ARButton.tsx
import { useEffect, useRef, useState } from "react";
import { ARButton as ThreeARButton } from "three/examples/jsm/webxr/ARButton.js";
import { jsx } from "react/jsx-runtime";
var ARButton = ({
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
            "immersive-ar"
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
    const arButton = ThreeARButton.createButton(renderer);
    arButton.style.cssText = "";
    arButton.className = "";
    Object.assign(arButton.style, {
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
      buttonRef.current.appendChild(arButton);
      buttonRef.current.onclick = (e) => {
        arButton.onclick?.(e);
        onClick?.(e);
      };
    }
    return () => {
      if (arButton.parentNode) {
        arButton.parentNode.removeChild(arButton);
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
  ARButton
};
