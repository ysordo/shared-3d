/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useActiveModel } from '../../hooks/useActiveModel';
import { THREE } from '../../lib';

type AnimationItem = {
  name: string;
  playForward: () => void;
  playBackward: () => void;
  toggle: () => void;
  isPlaying: boolean;
  isReversed: boolean;
};

type AnimationControllerProps = {
  children: (animations: AnimationItem[]) => ReactNode;
  className?: string;
};

export const AnimationController: React.FC<AnimationControllerProps> = ({
  children,
  className,
}) => {
  const model = useActiveModel() as THREE.Object3D;
  const [clips, setClips] = useState<THREE.AnimationClip[]>([]);
  const [mixer, setMixer] = useState(
    () => new THREE.AnimationMixer(null as any)
  );
  const [actions, setActions] = useState<Map<string, THREE.AnimationAction>>(
    new Map()
  );
  const [playing, setPlaying] = useState<Set<string>>(new Set());
  const [reversed, setReversed] = useState<Set<string>>(new Set());

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

      const newActions = new Map<string, THREE.AnimationAction>();
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

  const playForward = (name: string) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }

    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });

    action
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.2)
      .play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  const playBackward = (name: string) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }

    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });

    action
      .reset()
      .setEffectiveTimeScale(-1)
      .setEffectiveWeight(1)
      .fadeIn(0.2)
      .play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => new Set(prev).add(name));
  };

  const toggle = (name: string) => {
    if (reversed.has(name)) {
      playForward(name);
    } else {
      playBackward(name);
    }
  };

  const animationList: AnimationItem[] = clips.map((clip) => ({
    name: clip.name || `Animación ${clip.uuid.slice(0, 4)}`,
    playForward: () => playForward(clip.name),
    playBackward: () => playBackward(clip.name),
    toggle: () => toggle(clip.name),
    isPlaying: playing.has(clip.name),
    isReversed: reversed.has(clip.name),
  }));

  if (animationList.length === 0) {
    return null;
  }

  return <div className={className}>{children(animationList)}</div>;
};
