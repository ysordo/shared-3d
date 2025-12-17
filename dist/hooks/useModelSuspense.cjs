"use strict";Object.defineProperty(exports, "__esModule", {value: true});"use client";


var _chunkBZ6LGI3Qcjs = require('../chunk-BZ6LGI3Q.cjs');
require('../chunk-YYS2V2UH.cjs');
require('../chunk-KD4SYTBB.cjs');
require('../chunk-YAKUY6M3.cjs');
require('../chunk-ZJAPFMHD.cjs');
require('../chunk-7W7IF4LU.cjs');
require('../chunk-EA3XQ4KJ.cjs');
require('../chunk-T2YGLA3W.cjs');
require('../chunk-UW5RKAXQ.cjs');

// src/hooks/useModelSuspense.ts
var useModelSuspense = (entry) => {
  const preload = _chunkBZ6LGI3Qcjs.usePreload.call(void 0, );
  const model = preload.get(entry.id);
  if (!model) {
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
  return model;
};


exports.useModelSuspense = useModelSuspense;
