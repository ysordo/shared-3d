"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk62PYNVDOcjs = require('./chunk-62PYNVDO.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/AnimationTimeline.tsx
var _react = require('react');
var AnimationTimeline = ({
  steps,
  loop = false,
  autoplay = true
}) => {
  const model = _chunk62PYNVDOcjs.useActiveModel.call(void 0, );
  const mixerRef = _react.useRef.call(void 0, null);
  const actionsRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  const clock = _react.useRef.call(void 0, new _chunkEA3XQ4KJcjs.THREE.Clock());
  _react.useEffect.call(void 0, () => {
    if (!model || !model.animations) {
      return;
    }
    const mixer = new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model);
    mixerRef.current = mixer;
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      actionsRef.current.set(clip.name, action);
    });
    if (autoplay) {
      playTimeline();
    }
    const animate = () => {
      mixer.update(clock.current.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      mixer.stopAllAction();
    };
  }, [model]);
  const playTimeline = () => {
    let time = 0;
    steps.forEach((step) => {
      const action = actionsRef.current.get(step.clipName);
      if (!action) {
        return;
      }
      setTimeout(() => {
        action.reset().play();
      }, time);
      time += (step.delay || 0) + (step.duration || action.getClip().duration * 1e3);
    });
    if (loop) {
      setTimeout(playTimeline, time);
    }
  };
  return null;
};



exports.AnimationTimeline = AnimationTimeline;
