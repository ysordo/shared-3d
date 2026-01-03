"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk7J7CBFY2cjs = require('./chunk-7J7CBFY2.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/LightingController.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);
var _jsxruntime = require('react/jsx-runtime');
var LightingController = ({
  className
}) => {
  const orchestrator = _chunk7J7CBFY2cjs.useScene.call(void 0, );
  const [intensity, setIntensity] = _react.useState.call(void 0, 1);
  const updateLights = (value) => {
    setIntensity(value);
    _optionalChain([orchestrator, 'optionalAccess', _ => _.scene, 'access', _2 => _2.traverse, 'call', _3 => _3((obj) => {
      if (obj instanceof _chunkEA3XQ4KJcjs.THREE.Light) {
        obj.intensity = value * (obj.userData.baseIntensity || 1);
      }
    })]);
  };
  _react2.default.useEffect(() => {
    if (!orchestrator) {
      return;
    }
    orchestrator.scene.traverse((obj) => {
      if (obj instanceof _chunkEA3XQ4KJcjs.THREE.Light) {
        obj.userData.baseIntensity = obj.intensity;
      }
    });
  }, [orchestrator, _optionalChain([orchestrator, 'optionalAccess', _4 => _4.scene])]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `bg-black/80 text-white p-4 rounded-lg ${className || ""}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: "text-lg font-bold mb-3", children: "Iluminaci\xF3n Global" }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "label", { className: "block", children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "text-sm", children: [
        "Intensidad: ",
        intensity.toFixed(2)
      ] }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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



exports.LightingController = LightingController;
