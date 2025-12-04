import {
  useActiveModel
} from "./chunk-BZ5ZFRZF.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/controls/AnimationController.tsx
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var AnimationController = ({
  children,
  className
}) => {
  const model = useActiveModel();
  const [clips, setClips] = useState([]);
  const [mixer, setMixer] = useState(
    () => new THREE.AnimationMixer(null)
  );
  const [actions, setActions] = useState(
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = useState(/* @__PURE__ */ new Set());
  const [reversed, setReversed] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    if (!model) {
      setClips([]);
      mixer.stopAllAction();
      return;
    }
    if (model.animations && model.animations.length > 0) {
      setClips(model.animations);
      setMixer(new THREE.AnimationMixer(model));
      mixer.setTime(0);
      const newActions = /* @__PURE__ */ new Map();
      model.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.enabled = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.reset();
        newActions.set(clip.name, action);
      });
      setActions(newActions);
    }
    const clock = new THREE.Clock();
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
  return /* @__PURE__ */ jsx("div", { className, children: children(animationList) });
};

export {
  AnimationController
};
