import {
  useActiveModel
} from "./chunk-BZ5ZFRZF.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/hooks/useAnimation.ts
import { useEffect } from "react";
var useAnimation = (clipName, play = true) => {
  const model = useActiveModel();
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
    if (play) {
      action.play();
    }
    const clock = new THREE.Clock();
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

export {
  useAnimation
};
