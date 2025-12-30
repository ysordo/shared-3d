"use client";
import "../../chunk-25QOJ2PL.js";
import {
  usePreload
} from "../../chunk-R5SGHSIE.js";
import "../../chunk-375RC3KZ.js";
import "../../chunk-U6YB3DJH.js";
import "../../chunk-SRRBNWVQ.js";
import "../../chunk-OK2NCVM7.js";
import "../../chunk-OVHQQSEK.js";
import "../../chunk-RBZOTBBM.js";
import "../../chunk-7ZN6VXPX.js";
import "../../chunk-5QJW7WE3.js";

// src/react/hooks/useModelSuspense.ts
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
