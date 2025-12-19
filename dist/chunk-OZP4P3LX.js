import {
  useScene
} from "./chunk-VVJCLYBD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/controls/LightingController.tsx
import React, { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var LightingController = ({
  className
}) => {
  const orchestrator = useScene();
  const [intensity, setIntensity] = useState(1);
  const updateLights = (value) => {
    setIntensity(value);
    orchestrator?.scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.intensity = value * (obj.userData.baseIntensity || 1);
      }
    });
  };
  React.useEffect(() => {
    if (!orchestrator) {
      return;
    }
    orchestrator.scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.userData.baseIntensity = obj.intensity;
      }
    });
  }, [orchestrator, orchestrator?.scene]);
  return /* @__PURE__ */ jsxs("div", { className: `bg-black/80 text-white p-4 rounded-lg ${className || ""}`, children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-3", children: "Iluminaci\xF3n Global" }),
    /* @__PURE__ */ jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
        "Intensidad: ",
        intensity.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "3",
          step: "0.01",
          value: intensity,
          onChange: (e) => updateLights(parseFloat(e.target.value)),
          className: "w-full mt-2"
        }
      )
    ] })
  ] });
};

export {
  LightingController
};
