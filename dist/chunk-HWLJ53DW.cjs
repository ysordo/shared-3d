"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTK4GFD5Ecjs = require('./chunk-TK4GFD5E.cjs');


var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

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
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  const [plugin, setPlugin] = _react.useState.call(void 0, 
    null
  );
  const [panEnabled, setPanEnabled] = _react.useState.call(void 0, enablePan);
  const [rotateEnabled, setRotateEnabled] = _react.useState.call(void 0, enableRotate);
  const [zoomEnabled, setZoomEnabled] = _react.useState.call(void 0, enableZoom);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (plugin) {
      return;
    }
    const newPlugin = new (0, _chunkTK4GFD5Ecjs.AdvancedOrbitControlsPlugin)({
      enablePan,
      enableRotate,
      enableZoom,
      ...config
    });
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    return () => {
      newPlugin.dispose();
      setPlugin(null);
    };
  }, [orchestrator]);
  _react.useEffect.call(void 0, () => {
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children(state) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
