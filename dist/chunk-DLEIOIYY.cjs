"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkWAZQGQ6Zcjs = require('./chunk-WAZQGQ6Z.cjs');

// src/react/components/VRButton.tsx
var _react = require('react');
var _VRButtonjs = require('three/examples/jsm/webxr/VRButton.js');
var _jsxruntime = require('react/jsx-runtime');
var VRButton = ({
  children,
  className = "",
  onClick,
  ...restProps
}) => {
  const { renderer } = _chunkWAZQGQ6Zcjs.useScene.call(void 0, );
  const buttonRef = _react.useRef.call(void 0, null);
  const [isSupported, setIsSupported] = _react.useState.call(void 0, null);
  _react.useEffect.call(void 0, () => {
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
    const vrButton = _VRButtonjs.VRButton.createButton(renderer);
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
        _optionalChain([vrButton, 'access', _ => _.onclick, 'optionalCall', _2 => _2(e)]);
        _optionalChain([onClick, 'optionalCall', _3 => _3(e)]);
      };
    }
    return () => {
      if (vrButton.parentNode) {
        vrButton.parentNode.removeChild(vrButton);
      }
    };
  }, [renderer, onClick]);
  const disabledClasses = !isSupported ? "opacity-40! cursor-not-allowed! grayscale!" : "";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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



exports.VRButton = VRButton;
