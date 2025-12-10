import {
  useActiveModel
} from "./chunk-KJNAEIJW.js";
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
  const [mixer, setMixer] = useState(null);
  const [actions, setActions] = useState(
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = useState(/* @__PURE__ */ new Set());
  const [reversed, setReversed] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    if (!model) {
      setMixer(null);
      setClips([]);
      return;
    }
    const _mixer = new THREE.AnimationMixer(model);
    setMixer(_mixer);
    const _clips = model.animations ?? [];
    setClips(_clips);
    const _actions = /* @__PURE__ */ new Map();
    _clips.forEach((clip) => {
      const action = _mixer.clipAction(clip);
      action.clampWhenFinished = true;
      action.enabled = true;
      action.setLoop(THREE.LoopOnce, 1);
      action.reset();
      _actions.set(clip.name, action);
    });
    setActions(_actions);
    const clock = new THREE.Clock();
    const loop = () => {
      _mixer.update(clock.getDelta());
      requestAnimationFrame(loop);
    };
    loop();
    _mixer.addEventListener("finished", (e) => {
      const finishedName = e.action.getClip().name;
      const isReverse = reversed.has(finishedName);
      setReversed((prev) => {
        const newSet = new Set(prev);
        if (isReverse) {
          newSet.delete(finishedName);
        } else {
          newSet.add(finishedName);
        }
        return newSet;
      });
      setPlaying((prev) => {
        const newSet = new Set(prev);
        newSet.delete(finishedName);
        return newSet;
      });
    });
    return () => {
      _mixer.stopAllAction();
      _mixer.removeEventListener("finished", () => {
      });
    };
  }, [model]);
  const playForward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => n !== name && a.fadeOut(0.2));
    action.reset().setEffectiveTimeScale(1).fadeIn(0.2).play();
    setPlaying(/* @__PURE__ */ new Set([name]));
  };
  const playBackward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => n !== name && a.fadeOut(0.2));
    action.time = action.getClip().duration;
    action.setEffectiveTimeScale(-1).fadeIn(0.2).play();
    setPlaying(/* @__PURE__ */ new Set([name]));
  };
  const toggle = (name) => reversed.has(name) ? playBackward(name) : playForward(name);
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
  return /* @__PURE__ */ jsx("div", { className, children: children(animationList) });
};

export {
  AnimationController
};
