"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3ROQ5ZE4cjs = require('./chunk-3ROQ5ZE4.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/hooks/useAnimation.ts
var _react = require('react');
var useAnimation = (clipName, options = {}) => {
  const { play = true, loop = true, repetitions = Infinity } = options;
  const model = _chunk3ROQ5ZE4cjs.useActiveModel.call(void 0, );
  const mixerRef = _react.useRef.call(void 0, null);
  const actionRef = _react.useRef.call(void 0, null);
  const rafRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!model || !model.animations) {
      return;
    }
    const clip = model.animations.find((a) => a.name === clipName);
    if (!clip) {
      return;
    }
    const mixer = new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.enabled = true;
    action.setLoop(loop ? _chunkEA3XQ4KJcjs.THREE.LoopRepeat : _chunkEA3XQ4KJcjs.THREE.LoopOnce, repetitions);
    action.clampWhenFinished = true;
    if (play) {
      action.play();
    }
    mixerRef.current = mixer;
    actionRef.current = action;
    const clock = new _chunkEA3XQ4KJcjs.THREE.Clock();
    const animate = () => {
      if (!mixerRef.current) {
        return;
      }
      const delta = clock.getDelta();
      mixerRef.current.update(delta);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      action.stop();
      mixer.uncacheClip(clip);
      mixer.uncacheRoot(model);
    };
  }, [model, clipName, play, loop, repetitions]);
};



exports.useAnimation = useAnimation;
