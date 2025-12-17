import {
  useActiveModel
} from "./chunk-RNNUCY4D.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/hooks/useAnimation.ts
import { useEffect, useRef } from "react";
var useAnimation = (clipName, options = {}) => {
  const { play = true, loop = true, repetitions = Infinity } = options;
  const model = useActiveModel();
  const mixerRef = useRef(null);
  const actionRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!model || !model.animations) {
      return;
    }
    const clip = model.animations.find((a) => a.name === clipName);
    if (!clip) {
      return;
    }
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.enabled = true;
    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, repetitions);
    action.clampWhenFinished = true;
    if (play) {
      action.play();
    }
    mixerRef.current = mixer;
    actionRef.current = action;
    const clock = new THREE.Clock();
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

export {
  useAnimation
};
