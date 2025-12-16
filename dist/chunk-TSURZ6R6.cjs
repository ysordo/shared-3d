"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk45PBP2VLcjs = require('./chunk-45PBP2VL.cjs');


var _chunkAILAVZ2Gcjs = require('./chunk-AILAVZ2G.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  children,
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  ...config
}) => {
  const orchestrator = _chunk45PBP2VLcjs.useScene.call(void 0, );
  const [panEnabled, setPanEnabled] = _react.useState.call(void 0, enablePan);
  const [rotateEnabled, setRotateEnabled] = _react.useState.call(void 0, enableRotate);
  const [zoomEnabled, setZoomEnabled] = _react.useState.call(void 0, enableZoom);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (orchestrator.has("AdvancedOrbitControls")) {
      return;
    }
    const plugin = new (0, _chunkAILAVZ2Gcjs.AdvancedOrbitControlsPlugin)({
      enablePan,
      enableRotate,
      enableZoom,
      ...config
    });
    orchestrator.use(plugin);
    return () => {
      _optionalChain([orchestrator, 'access', _ => _.plugin, 'call', _2 => _2("AdvancedOrbitControls"), 'access', _3 => _3.dispose, 'optionalCall', _4 => _4()]);
      orchestrator.remove("AdvancedOrbitControls");
    };
  }, [orchestrator]);
  _react.useEffect.call(void 0, () => {
    const plugin = orchestrator.plugin(
      "AdvancedOrbitControls"
    );
    if (!plugin) {
      return;
    }
    plugin.setPanEnabled(panEnabled);
    plugin.setRotateEnabled(rotateEnabled);
    plugin.setZoomEnabled(zoomEnabled);
  }, [panEnabled, rotateEnabled, zoomEnabled]);
  const setAllEnabled = (value) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };
  const togglePan = () => setPanEnabled((p) => !p);
  const toggleRotate = () => setRotateEnabled((p) => !p);
  const toggleZoom = () => setZoomEnabled((p) => !p);
  const toggleAll = () => setAllEnabled(!(panEnabled && rotateEnabled && zoomEnabled));
  const state = {
    panEnabled,
    rotateEnabled,
    zoomEnabled,
    isActive: panEnabled || rotateEnabled || zoomEnabled,
    setPanEnabled,
    setRotateEnabled,
    setZoomEnabled,
    setAllEnabled,
    togglePan,
    toggleRotate,
    toggleZoom,
    toggleAll
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _5 => _5(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
