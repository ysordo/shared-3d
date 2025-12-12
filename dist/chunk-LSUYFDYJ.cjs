"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkKVBZPHVZcjs = require('./chunk-KVBZPHVZ.cjs');


var _chunkMCYH2TBQcjs = require('./chunk-MCYH2TBQ.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const orchestrator = _chunkKVBZPHVZcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!enabled) {
      return;
    }
    const plugin = new (0, _chunkMCYH2TBQcjs.PostProcessingPlugin)(bloom);
    orchestrator.use(plugin);
    return () => {
    };
  }, [enabled, bloom.strength, bloom.radius, bloom.threshold]);
  return null;
};



exports.PostProcessing = PostProcessing;
