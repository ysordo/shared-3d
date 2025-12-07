"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTCGMY7MKcjs = require('./chunk-TCGMY7MK.cjs');


var _chunkNXMNULHBcjs = require('./chunk-NXMNULHB.cjs');

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
  const orchestrator = _chunkNXMNULHBcjs.useScene.call(void 0, );
  const [plugin, setPlugin] = _react.useState.call(void 0, 
    null
  );
  const [panEnabled, setPanEnabled] = _react.useState.call(void 0, enablePan);
  const [rotateEnabled, setRotateEnabled] = _react.useState.call(void 0, enableRotate);
  const [zoomEnabled, setZoomEnabled] = _react.useState.call(void 0, enableZoom);
  _react.useEffect.call(void 0, () => {
    const newPlugin = new (0, _chunkTCGMY7MKcjs.AdvancedOrbitControlsPlugin)({
      enablePan,
      enableRotate,
      enableZoom,
      ...config
    });
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    return () => {
      newPlugin.dispose();
    };
  }, [
    orchestrator,
    enablePan,
    enableRotate,
    enableZoom,
    ...Object.values(config)
  ]);
  _react.useEffect.call(void 0, () => {
    if (!plugin) {
      return;
    }
    plugin.setPanEnabled(panEnabled);
    plugin.setRotateEnabled(rotateEnabled);
    plugin.setZoomEnabled(zoomEnabled);
  }, [plugin, panEnabled, rotateEnabled, zoomEnabled]);
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
