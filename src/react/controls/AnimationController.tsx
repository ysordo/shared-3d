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
  const model = useActiveModel() as THREE.Object3D | null;

  const [clips, setClips] = useState<THREE.AnimationClip[]>([]);
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  const [actions, setActions] = useState<Map<string, THREE.AnimationAction>>(
    new Map()
  );
  const [playing, setPlaying] = useState<Set<string>>(new Set());
  const [reversed, setReversed] = useState<Set<string>>(new Set());

  // Crear mixer y acciones cuando el modelo cambie
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

    const _actions = new Map<string, THREE.AnimationAction>();
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

    // 🔥 Detectar fin de animación
    _mixer.addEventListener('finished', (e: any) => {
      const finishedName = e.action.getClip().name;
      const isReverse = reversed.has(finishedName);

      // al terminar forward → reversed = true
      // al terminar backward → reversed = false
      setReversed((prev) => {
        const newSet = new Set(prev);
        if (isReverse) {
          newSet.delete(finishedName);
        } // terminó backward
        else {
          newSet.add(finishedName);
        } // terminó forward
        return newSet;
      });

      // al terminar siempre deja de estar reproduciendo
      setPlaying((prev) => {
        const newSet = new Set(prev);
        newSet.delete(finishedName);
        return newSet;
      });
    });

    return () => {
      _mixer.stopAllAction();
      _mixer.removeEventListener('finished', () => {});
    };
  }, [model]);

  // --- Controles de reproducción ---
  const playForward = (name: string) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }

    actions.forEach((a, n) => n !== name && a.fadeOut(0.2));

    action.reset().setEffectiveTimeScale(1).fadeIn(0.2).play();
    setPlaying(new Set([name]));
  };

  const playBackward = (name: string) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }

    actions.forEach((a, n) => n !== name && a.fadeOut(0.2));

    action.reset().setEffectiveTimeScale(-1).fadeIn(0.2).play();
    setPlaying(new Set([name]));
    setReversed((prev) => new Set(prev).add(name));
  };

  const toggle = (name: string) =>
    reversed.has(name) ? playBackward(name) : playForward(name);

  const animationList: AnimationItem[] = clips.map((clip) => ({
    name: clip.name || `Anim ${clip.uuid.slice(0, 4)}`,
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
