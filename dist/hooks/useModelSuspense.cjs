"use strict";Object.defineProperty(exports, "__esModule", {value: true});"use client";


var _chunk4VF3UEKTcjs = require('../chunk-4VF3UEKT.cjs');
require('../chunk-4ELG7LDC.cjs');
require('../chunk-KD4SYTBB.cjs');
require('../chunk-YAKUY6M3.cjs');
require('../chunk-ZJAPFMHD.cjs');
require('../chunk-7W7IF4LU.cjs');
require('../chunk-EA3XQ4KJ.cjs');
require('../chunk-T2YGLA3W.cjs');
require('../chunk-UW5RKAXQ.cjs');

// src/hooks/useModelSuspense.ts
var _react = require('react');
var useModelSuspense = (entry) => {
  const preload = _chunk4VF3UEKTcjs.usePreload.call(void 0, );
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
