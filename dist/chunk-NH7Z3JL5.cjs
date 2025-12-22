"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkGMH5GOKAcjs = require('./chunk-GMH5GOKA.cjs');


var _chunkZHLNOXCWcjs = require('./chunk-ZHLNOXCW.cjs');

// src/hooks/useRaycaster.ts
var _react = require('react');
var useRaycaster = (onEvent) => {
  const orchestrator = _chunkGMH5GOKAcjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (pluginRef.current) {
      pluginRef.current.update({ onEvent });
      return;
    }
    const plugin = new (0, _chunkZHLNOXCWcjs.RaycasterPlugin)({ onEvent });
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
