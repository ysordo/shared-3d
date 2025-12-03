"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkHXIZIIK7cjs = require('./chunk-HXIZIIK7.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/AnimationController.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AnimationController = ({
  children,
  className
}) => {
  const model = _chunkHXIZIIK7cjs.useActiveModel.call(void 0, );
  const [clips, setClips] = _react.useState.call(void 0, []);
  const [mixer, setMixer] = _react.useState.call(void 0, 
    () => new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(null)
  );
  const [actions, setActions] = _react.useState.call(void 0, 
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
  const [reversed, setReversed] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
  _react.useEffect.call(void 0, () => {
    if (!model) {
      setClips([]);
      mixer.stopAllAction();
      return;
    }
    if (model.animations && model.animations.length > 0) {
      setClips(model.animations);
      setMixer(new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model));
      mixer.setTime(0);
      const newActions = /* @__PURE__ */ new Map();
      model.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.enabled = true;
        action.setLoop(_chunkEA3XQ4KJcjs.THREE.LoopOnce, 1);
        action.reset();
        newActions.set(clip.name, action);
      });
      setActions(newActions);
    }
    const clock = new _chunkEA3XQ4KJcjs.THREE.Clock();
    const animate = () => {
      mixer.update(clock.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      mixer.stopAllAction();
    };
  }, [model]);
  const playForward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });
    action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.2).play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };
  const playBackward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });
    action.reset().setEffectiveTimeScale(-1).setEffectiveWeight(1).fadeIn(0.2).play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => new Set(prev).add(name));
  };
  const toggle = (name) => {
    if (reversed.has(name)) {
      playForward(name);
    } else {
      playBackward(name);
    }
  };
  const animationList = clips.map((clip) => ({
    name: clip.name || `Animaci\xF3n ${clip.uuid.slice(0, 4)}`,
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
