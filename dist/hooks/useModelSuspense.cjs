"use strict";Object.defineProperty(exports, "__esModule", {value: true});"use client";
require('../chunk-7TY62NVN.cjs');


var _chunkNJFICWZPcjs = require('../chunk-NJFICWZP.cjs');
require('../chunk-N7NMY3OP.cjs');
require('../chunk-DBJHBTDM.cjs');
require('../chunk-QPTSJCSB.cjs');
require('../chunk-UW5RKAXQ.cjs');
require('../chunk-7W7IF4LU.cjs');
require('../chunk-EA3XQ4KJ.cjs');
require('../chunk-T2YGLA3W.cjs');

// src/hooks/useModelSuspense.ts
var _react = require('react');
var useModelSuspense = (entry) => {
  const { getPreloaded } = _chunkNJFICWZPcjs.usePreload.call(void 0, );
  const model = _react.useRef.call(void 0, void 0);
  _react.useEffect.call(void 0, () => {
    model.current = getPreloaded(entry.id);
    if (!model.current) {
      throw new Promise((resolve) => {
        const check = () => {
          const m = getPreloaded(entry.id);
          if (m) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
    }
  }, [entry.id]);
  return model.current;
};


exports.useModelSuspense = useModelSuspense;
