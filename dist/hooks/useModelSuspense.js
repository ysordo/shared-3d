"use client";
import "../chunk-XZDEPNIW.js";
import {
  usePreload
} from "../chunk-J5USS2N5.js";
import "../chunk-UM33TU2C.js";
import "../chunk-VJZD7N2Z.js";
import "../chunk-SRRBNWVQ.js";
import "../chunk-5QJW7WE3.js";
import "../chunk-OK2NCVM7.js";
import "../chunk-OVHQQSEK.js";
import "../chunk-EPN65WJP.js";

// src/hooks/useModelSuspense.ts
import { useEffect, useRef } from "react";
var useModelSuspense = (entry) => {
  const { getPreloaded } = usePreload();
  const model = useRef(void 0);
  useEffect(() => {
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
export {
  useModelSuspense
};
