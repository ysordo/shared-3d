"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkFH6APZUOcjs = require('./chunk-FH6APZUO.cjs');


var _chunkIB6RDH7Pcjs = require('./chunk-IB6RDH7P.cjs');

// src/hooks/useRaycaster.ts
var _react = require('react');
var useRaycaster = (onEvent) => {
  const orchestrator = _chunkIB6RDH7Pcjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (pluginRef.current) {
      pluginRef.current.updateCallback(onEvent);
      return;
    }
    const plugin = new (0, _chunkFH6APZUOcjs.RaycasterPlugin)(onEvent);
    pluginRef.current = plugin;
    orchestrator.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(plugin.name);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, onEvent]);
};



exports.useRaycaster = useRaycaster;
