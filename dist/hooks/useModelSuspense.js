"use client";
import {
  usePreload
} from "../chunk-HLQMH3OC.js";
import "../chunk-VCRCZ2DI.js";
import "../chunk-SDC57GRH.js";
import "../chunk-QHQFF7D7.js";
import "../chunk-W5OYT3BE.js";
import "../chunk-OK2NCVM7.js";
import "../chunk-OVHQQSEK.js";
import "../chunk-EPN65WJP.js";
import "../chunk-5QJW7WE3.js";

// src/hooks/useModelSuspense.ts
import { useEffect, useRef } from "react";
var useModelSuspense = (entry) => {
  const preload = usePreload();
  const model = useRef(void 0);
  useEffect(() => {
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
export {
  useModelSuspense
};
