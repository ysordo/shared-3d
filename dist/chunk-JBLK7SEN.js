import {
  useScene
} from "./chunk-EABNOBME.js";

// src/hooks/useModel.ts
import { useEffect, useState } from "react";
var useModel = (entry, options = {}) => {
  const { draco = false, autoLoad = true } = options;
  const orchestrator = useScene();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!entry || !autoLoad) {
      return;
    }
    setLoading(true);
    setError(null);
    orchestrator.setModel(entry, { draco }).then((m) => {
      setModel(m);
      setLoading(false);
    }).catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, [entry?.id, draco]);
  const load = () => entry && orchestrator.setModel(entry, { draco });
  return { model, loading, error, load };
};

export {
  useModel
};
