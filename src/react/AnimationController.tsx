// src/components/AnimationController.tsx
import React, { useEffect, useState } from 'react';
import { useSceneContext } from './SceneContext';

interface AnimationControllerProps {
  className?: string;
  children: React.ReactNode;
  state?: (v: boolean) => void;
}

export const AnimationController: React.FC<AnimationControllerProps> = ({
  className = '',
  children,
  state,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (sceneManager && disabled) {
      if (direction === 'forward') {
        sceneManager?.getAnimationManager()?.playForward(() => {
          setDisabled(false);
          state?.(false);
          setDirection('backward');
        });
      } else {
        sceneManager?.getAnimationManager()?.playBackward(() => {
          setDisabled(false);
          state?.(false);
          setDirection('forward');
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);
  const handleClick = () => {
    if (sceneManager?.getAnimationManager()?.isBusy()) {
      return;
    }
    setDisabled(true);
    state?.(true);
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};
