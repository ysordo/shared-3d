"use strict";Object.defineProperty(exports, "__esModule", {value: true});"use client";


var _chunkOC224UIFcjs = require('../chunk-OC224UIF.cjs');
require('../chunk-DAZUNGPA.cjs');
require('../chunk-4JGLI6CR.cjs');
require('../chunk-DORUFBZF.cjs');
require('../chunk-ZJAPFMHD.cjs');
require('../chunk-7W7IF4LU.cjs');
require('../chunk-EA3XQ4KJ.cjs');
require('../chunk-T2YGLA3W.cjs');
require('../chunk-UW5RKAXQ.cjs');

// src/hooks/useModelSuspense.ts
var _react = require('react');
var useModelSuspense = (entry) => {
  const preload = _chunkOC224UIFcjs.usePreload.call(void 0, );
  const model = _react.useRef.call(void 0, void 0);
  _react.useEffect.call(void 0, () => {
    if (!preload) {
      return;
    }
    model.current = preload.get(entry.id);
    if (!model.current) {
      throw new Promise((resolve) => {
        const check = () => {
          const m = preload.get(entry.id);
          if (m) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
    }
  }, [preload]);
  return model.current;
};


exports.useModelSuspense = useModelSuspense;
