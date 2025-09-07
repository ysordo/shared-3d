// src/components/AnimationController.tsx
import React, { useEffect, useState } from 'react';
import { useSceneContext } from './SceneContext';

interface AnimationControllerProps {
  className?: string;
  children: React.ReactNode;
}

const AnimationController: React.FC<AnimationControllerProps> = ({
  className = '',
  children,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (sceneManager && disabled) {
      if (direction === 'forward') {
        sceneManager
          ?.getAnimationManager()
          ?.playForward(() => setDisabled(false));
      } else {
        sceneManager
          ?.getAnimationManager()
          ?.playBackward(() => setDisabled(false));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);
  const handleClick = () => {
    if (sceneManager?.getAnimationManager()?.isBusy()) {
      return;
    }
    setDisabled(true);
    setDirection((old) => (old === 'forward' ? 'backward' : 'forward'));
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default AnimationController;
