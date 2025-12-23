import {
  usePreload
} from "./chunk-AOXQLLJ6.js";
import {
  GLTFLoader
} from "./chunk-6FBDZUDJ.js";

// src/react/components/ModelPreload.tsx
import { useEffect, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var ModelPreload = ({
  entries,
  draco = false,
  onStatus,
  children
}) => {
  const preload = usePreload();
  const [progressList, setProgressList] = useState(
    entries.map((e) => ({
      id: e.id,
      percent: 0,
      status: "loading"
    }))
  );
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  useEffect(() => {
    if (entries.length === 0) {
      return;
    }
    let aborted = false;
    setProgressList(
      entries.map((e) => ({
        id: e.id,
        percent: 0,
        status: "loading"
      }))
    );
    setProgress({ completed: 0, total: entries.length });
    Promise.all(
      entries.map(
        (entry) => GLTFLoader.load(entry, {
          draco,
          onLoaded: (obj) => {
            if (aborted) {
              return;
            }
            preload.set(entry.id, obj);
            setProgress((prev) => ({ ...prev, completed: prev.completed + 1 }));
            setProgressList(
              (prev) => prev.map(
                (item) => item.id === entry.id ? { ...item, percent: 100, status: "completed" } : item
              )
            );
          },
          onProgress: ({ percent }) => {
            if (aborted) {
              return;
            }
            setProgressList(
              (prev) => prev.map(
                (item) => item.id === entry.id ? { ...item, percent: percent ?? 0 } : item
              )
            );
          },
          onError: () => {
            if (aborted) {
              return;
            }
            setProgressList(
              (prev) => prev.map(
                (item) => item.id === entry.id ? { ...item, percent: 0, status: "error" } : item
              )
            );
          }
        })
      )
    ).catch((err) => {
      if (!aborted) {
        console.error("Preload batch failed:", err);
      }
    });
    return () => {
      aborted = true;
    };
  }, [entries, draco, preload]);
  useEffect(() => {
    if (progressList.length === 0) {
      return;
    }
    if (progressList.every((item) => item.status === "completed")) {
      onStatus?.(true);
    }
  }, [progressList, onStatus]);
  if (progressList.every((item) => item.status === "completed")) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: children(progressList, progress.completed, progress.total) });
};

export {
  ModelPreload
};
