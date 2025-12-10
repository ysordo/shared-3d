"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkDEXPOPMYcjs = require('./chunk-DEXPOPMY.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/AnimationController.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AnimationController = ({
  children,
  className
}) => {
  const model = _chunkDEXPOPMYcjs.useActiveModel.call(void 0, );
  const [clips, setClips] = _react.useState.call(void 0, []);
  const [mixer, setMixer] = _react.useState.call(void 0, null);
  const [actions, setActions] = _react.useState.call(void 0, 
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
  const [reversed, setReversed] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
  _react.useEffect.call(void 0, () => {
    if (!model) {
      setMixer(null);
      setClips([]);
      return;
    }
    const _mixer = new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model);
    setMixer(_mixer);
    const _clips = _nullishCoalesce(model.animations, () => ( []));
    setClips(_clips);
    const _actions = /* @__PURE__ */ new Map();
    _clips.forEach((clip) => {
      const action = _mixer.clipAction(clip);
      action.clampWhenFinished = true;
      action.enabled = true;
      action.setLoop(_chunkEA3XQ4KJcjs.THREE.LoopOnce, 1);
      action.reset();
      _actions.set(clip.name, action);
    });
    setActions(_actions);
    const clock = new _chunkEA3XQ4KJcjs.THREE.Clock();
    const loop = () => {
      _mixer.update(clock.getDelta());
      requestAnimationFrame(loop);
    };
    loop();
    return () => {
      _mixer.stopAllAction();
    };
  }, [model]);
  const playForward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => n !== name && a.fadeOut(0.2));
    action.reset().setEffectiveTimeScale(1).fadeIn(0.2).play();
    setPlaying((p) => new Set(p).add(name));
    setReversed((r) => {
      const n = new Set(r);
      n.delete(name);
      return n;
    });
  };
  const playBackward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => n !== name && a.fadeOut(0.2));
    action.reset().setEffectiveTimeScale(-1).fadeIn(0.2).play();
    setPlaying((p) => new Set(p).add(name));
    setReversed((r) => new Set(r).add(name));
  };
  const toggle = (name) => reversed.has(name) ? playForward(name) : playBackward(name);
  const animationList = clips.map((clip) => ({
    name: clip.name || `Anim ${clip.uuid.slice(0, 4)}`,
    playForward: () => playForward(clip.name),
    playBackward: () => playBackward(clip.name),
    toggle: () => toggle(clip.name),
    isPlaying: playing.has(clip.name),
    isReversed: reversed.has(clip.name)
  }));
  if (animationList.length === 0) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(animationList) });
};



exports.AnimationController = AnimationController;
