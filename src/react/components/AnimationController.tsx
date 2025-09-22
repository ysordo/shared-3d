// src/components/AnimationController.tsx
import React, { useEffect, useState } from 'react';
import { useSceneContext } from '../hooks/SceneContext';

interface AnimationControllerProps {
  className?: string;
  children: React.ReactNode;
  state?: (v: boolean) => void;
}

const AnimationController: React.FC<AnimationControllerProps> = ({
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
        sceneManager?.getAnimationManager()?.playForward('0',() => {
          setDisabled(false);
          state?.(false);
          setDirection('backward');
        });
      } else {
        sceneManager?.getAnimationManager()?.playBackward('0',() => {
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
    <button
      onClick={handleClick}
      disabled={disabled}
      className={className}
      name={direction}>
      {children}
    </button>
  );
};

export const Animation = {
  ButtonController: AnimationController,
};
