"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkYRRSDA23cjs = require('./chunk-YRRSDA23.cjs');


var _chunkFVN3RA46cjs = require('./chunk-FVN3RA46.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var ModelPreload = ({
  entries,
  draco = false,
  children
}) => {
  const preload = _chunkYRRSDA23cjs.usePreload.call(void 0, );
  const [progressList, setProgressList] = _react.useState.call(void 0, 
    entries.map((e) => ({
      id: e.id,
      percent: 0,
      status: "loading"
    }))
  );
  _react.useEffect.call(void 0, () => {
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
        (entry) => _chunkFVN3RA46cjs.GLTFLoader.load(entry, {
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
                (item) => item.id === entry.id ? { ...item, percent: _nullishCoalesce(percent, () => ( 0)) } : item
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children(progressList) });
};



exports.ModelPreload = ModelPreload;
