'use client';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useActiveModel } from '../../hooks/useActiveModel';
import { THREE } from '../../lib';

type TimelineStep = {
  clipName: string;
  duration?: number;
  delay?: number;
};

type AnimationTimelineProps = {
  steps: TimelineStep[];
  loop?: boolean;
  autoplay?: boolean;
};

export const AnimationTimeline: React.FC<AnimationTimelineProps> = ({
  steps,
  loop = false,
  autoplay = true,
}) => {
  const model = useActiveModel();
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Map<string, THREE.AnimationAction>>(new Map());
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

      time +=
        (step.delay || 0) + (step.duration || action.getClip().duration * 1000);
    });

    if (loop) {
      setTimeout(playTimeline, time);
    }
  };

  return null;
};
