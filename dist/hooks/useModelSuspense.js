"use client";
import {
  usePreload
} from "../chunk-Y5FNSTIY.js";
import "../chunk-3N37SJIR.js";
import "../chunk-SENENRNP.js";
import "../chunk-VSTC7ZYY.js";
import "../chunk-W5OYT3BE.js";
import "../chunk-OK2NCVM7.js";
import "../chunk-OVHQQSEK.js";
import "../chunk-EPN65WJP.js";
import "../chunk-5QJW7WE3.js";

// src/hooks/useModelSuspense.ts
var useModelSuspense = (entry) => {
  const preload = usePreload();
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
export {
  useModelSuspense
};
