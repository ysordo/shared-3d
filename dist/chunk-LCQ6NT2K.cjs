"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2AFP7TSYcjs = require('./chunk-2AFP7TSY.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/hooks/useAnimation.ts
var _react = require('react');
var useAnimation = (clipName, play = true) => {
  const model = _chunk2AFP7TSYcjs.useActiveModel.call(void 0, );
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
    if (play) {
      action.play();
    }
    const clock = new _chunkEA3XQ4KJcjs.THREE.Clock();
    const animate = () => {
      mixer.update(clock.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      action.stop();
    };
  }, [model, clipName, play]);
};



exports.useAnimation = useAnimation;
