import {
  useActiveModel
} from "./chunk-HB4RZM2W.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AnimationTimeline.tsx
import { useEffect, useRef } from "react";
var AnimationTimeline = ({
  steps,
  loop = false,
  autoplay = true
}) => {
  const model = useActiveModel();
  const mixerRef = useRef(null);
  const actionsRef = useRef(/* @__PURE__ */ new Map());
  const clock = useRef(new THREE.Clock());
  useEffect(() => {
    if (!model || !model.animations) {
      return;
    }
    const mixer = new THREE.AnimationMixer(model);
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

export {
  AnimationTimeline
};
