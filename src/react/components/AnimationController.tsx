// src/components/AnimationController.tsx
import React, { useEffect, useState } from 'react';
import { useSceneContext } from '../hooks/SceneContext';

interface AnimationControllerProps {
  className?: string;
  children?: React.ReactNode;
  state?: ({ status, dir }: { status: boolean; dir: string }) => void;
  id?: string;
}

const AnimationController: React.FC<AnimationControllerProps> = ({
  className = '',
  children,
  state,
  id = '0',
}) => {
  const [disabled, setDisabled] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (sceneManager && disabled) {
      if (direction === 'forward') {
        sceneManager?.getAnimationManager()?.playForward(id, () => {
          setDisabled(false);
          state?.({ status: false, dir: 'backward' });
          setDirection('backward');
        });
      } else {
        sceneManager?.getAnimationManager()?.playBackward(id, () => {
          setDisabled(false);
          state?.({ status: false, dir: 'forward' });
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
    state?.({ status: true, dir: direction });
  };

  return (
    <button
      id={`anim-${id.toLowerCase()}`}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      name={direction}>
      {children}
    </button>
  );
};

interface AnimationMultiplyControllerProps {
  children: (
    list: { name: string; button: React.FC<AnimationControllerProps> }[]
  ) => React.ReactNode;
}

const AnimationMultiplyController: React.FC<
  AnimationMultiplyControllerProps
> = ({ children }) => {
  const [list, setList] = useState<string[]>([]);
  const { sceneManager } = useSceneContext();
  useEffect(() => {

    if (sceneManager && sceneManager.activeModelId) {

      const animationManager = sceneManager.getAnimationManager?.();

      if (animationManager) {

        const actions = animationManager.actions;

        if (actions && typeof actions === 'object') {
          try {
            const actionKeys = Object.keys(actions);
            setList(actionKeys);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            setList([]);
          }
        } else {
          setList([]);
        }
      } else {
        setList([]);
      }
    } else {
      setList([]);
    }
  }, [sceneManager, sceneManager?.activeModelId]);
  if (list.length > 0) {
    if (typeof children === 'function') {
      const ls = list.map((v) => ({ name: v, button: AnimationController }));
      return <>{children?.(ls)}</>;
    } else {
      return children;
    }
  } else {
    return null;
  }
};

export const Animation = {
  ButtonController: AnimationController,
  MultiplyController: AnimationMultiplyController,
};
