import {
  useScene
} from "./chunk-7C6GE4GX.js";

// src/hooks/useHDRI.ts
import { useEffect, useState, useRef } from "react";
var useHDRI = (entry) => {
  const orchestrator = useScene();
  const [hdri, setHDRI] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentEntryRef = useRef(null);
  const abortRef = useRef(() => {
  });
  useEffect(() => {
    if (!entry) {
      setHDRI(null);
      setLoading(false);
      return;
    }
    abortRef.current();
    currentEntryRef.current = entry;
    setLoading(true);
    let cancelled = false;
    abortRef.current = () => {
      cancelled = true;
    };
    orchestrator.setHDRI(entry).then((tex) => {
      if (cancelled || currentEntryRef.current?.id !== entry.id) {
        return;
      }
      setHDRI(tex);
      setLoading(false);
    }).catch((err) => {
      if (cancelled) {
        return;
      }
      console.error("[useHDRI] Error loading HDRI:", err);
      setLoading(false);
    });
    return () => {
      abortRef.current();
    };
  }, [entry?.id, orchestrator]);
  const clear = () => {
    orchestrator.clearHDRI();
    setHDRI(null);
  };
  return { hdri, loading, clear };
};

export {
  useHDRI
};
