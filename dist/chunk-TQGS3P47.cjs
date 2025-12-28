"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkFVN3RA46cjs = require('./chunk-FVN3RA46.cjs');


var _chunkSLDMT4C4cjs = require('./chunk-SLDMT4C4.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var ModelPreload = ({
  entries,
  draco = false,
  onStatus,
  children
}) => {
  const { preloadModel } = _chunkSLDMT4C4cjs.usePreload.call(void 0, );
  const [progressList, setProgressList] = _react.useState.call(void 0, 
    entries.map((e) => ({
      id: e.id,
      percent: 0,
      status: "loading"
    }))
  );
  const [progress, setProgress] = _react.useState.call(void 0, { completed: 0, total: 0 });
  _react.useEffect.call(void 0, () => {
    _optionalChain([onStatus, 'optionalCall', _ => _(false)]);
  }, [entries, onStatus]);
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
    setProgress({ completed: 0, total: entries.length });
    Promise.all(
      entries.map(
        (entry) => _chunkFVN3RA46cjs.GLTFLoader.load(entry, {
          draco,
          onLoaded: (obj) => {
            if (aborted) {
              return;
            }
            preloadModel(entry.id, obj);
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
  }, [entries, draco]);
  _react.useEffect.call(void 0, () => {
    if (progressList.length === 0) {
      return;
    }
    if (progressList.every((item) => item.status === "completed")) {
      _optionalChain([onStatus, 'optionalCall', _2 => _2(true)]);
    }
  }, [progressList, onStatus]);
  if (progressList.every((item) => item.status === "completed")) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children(progressList, progress.completed, progress.total) });
};



exports.ModelPreload = ModelPreload;
