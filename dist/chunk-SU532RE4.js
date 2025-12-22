import {
  GLTFLoader
} from "./chunk-6FBDZUDJ.js";
import {
  usePreload
} from "./chunk-AOXQLLJ6.js";

// src/react/components/ModelPreload.tsx
import { useEffect, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var ModelPreload = ({
  entries,
  draco = false,
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
    Promise.all(
      entries.map(
        (entry) => GLTFLoader.load(entry, {
          draco,
          onLoaded: (obj) => {
            if (aborted) {
              return;
            }
            preload.set(entry.id, obj);
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
  return /* @__PURE__ */ jsx(Fragment, { children: children(progressList) });
};

export {
  ModelPreload
};
