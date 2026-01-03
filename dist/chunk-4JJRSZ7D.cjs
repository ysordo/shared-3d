"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk7J7CBFY2cjs = require('./chunk-7J7CBFY2.cjs');


var _chunkI4I7H56Bcjs = require('./chunk-I4I7H56B.cjs');

// src/react/hooks/useRaycaster.ts
var _react = require('react');
var useRaycaster = (onEvent) => {
  const orchestrator = _chunk7J7CBFY2cjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (pluginRef.current) {
      pluginRef.current.update({ onEvent });
      return;
    }
    const plugin = new (0, _chunkI4I7H56Bcjs.RaycasterPlugin)({ onEvent });
    pluginRef.current = plugin;
    orchestrator.plugin.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.plugin.remove(plugin.name);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, onEvent]);
};



exports.useRaycaster = useRaycaster;
