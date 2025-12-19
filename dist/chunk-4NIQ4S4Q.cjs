"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkL3KVNMIIcjs = require('./chunk-L3KVNMII.cjs');


var _chunkFH6APZUOcjs = require('./chunk-FH6APZUO.cjs');

// src/hooks/useRaycaster.ts
var _react = require('react');
var useRaycaster = (onEvent) => {
  const orchestrator = _chunkL3KVNMIIcjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
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
