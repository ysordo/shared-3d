'use client';

import { useEffect, useRef } from 'react';
import { useActiveModel } from './useActiveModel';
import { THREE } from '../../lib';

export const useAnimation = (
  clipName: string,
  options: { play?: boolean; loop?: boolean; repetitions?: number } = {}
) => {
  const { play = true, loop = true, repetitions = Infinity } = options;
  const model = useActiveModel();
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!model || !model.animations) {return;}

    const clip = model.animations.find((a) => a.name === clipName);
    if (!clip) {return;}

    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);

    action.enabled = true;
    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, repetitions);
    action.clampWhenFinished = true;

    if (play) {action.play();}

    mixerRef.current = mixer;
    actionRef.current = action;

    const clock = new THREE.Clock();

    const animate = () => {
      if (!mixerRef.current) {return;}
      const delta = clock.getDelta();
      mixerRef.current.update(delta);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {cancelAnimationFrame(rafRef.current);}
      action.stop();
      mixer.uncacheClip(clip);
      mixer.uncacheRoot(model);
    };
  }, [model, clipName, play, loop, repetitions]);
};