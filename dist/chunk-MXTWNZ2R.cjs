"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkB5ZMYPSVcjs = require('./chunk-B5ZMYPSV.cjs');


var _chunkW4PDMXIPcjs = require('./chunk-W4PDMXIP.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  children,
  defaultEnabled = true,
  ...config
}) => {
  const orchestrator = _chunkW4PDMXIPcjs.useScene.call(void 0, );
  const [panEnabled, setPanEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [rotateEnabled, setRotateEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [zoomEnabled, setZoomEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [plugin, setPlugin] = _react.useState.call(void 0, 
    null
  );
  _react.useEffect.call(void 0, () => {
    const newPlugin = new (0, _chunkB5ZMYPSVcjs.AdvancedOrbitControlsPlugin)(config);
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    newPlugin.setAllEnabled(defaultEnabled);
    return () => {
      newPlugin.dispose();
    };
  }, []);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _ => _.setPanEnabled, 'call', _2 => _2(panEnabled)]);
  }, [plugin, panEnabled]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _3 => _3.setRotateEnabled, 'call', _4 => _4(rotateEnabled)]);
  }, [plugin, rotateEnabled]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _5 => _5.setZoomEnabled, 'call', _6 => _6(zoomEnabled)]);
  }, [plugin, zoomEnabled]);
  const setAllEnabled = (value) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };
  const togglePan = () => setPanEnabled((prev) => !prev);
  const toggleRotate = () => setRotateEnabled((prev) => !prev);
  const toggleZoom = () => setZoomEnabled((prev) => !prev);
  const toggleAll = () => setAllEnabled(!(rotateEnabled && panEnabled && zoomEnabled));
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children(state) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
