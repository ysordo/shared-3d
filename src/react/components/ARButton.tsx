'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useScene } from '../hooks/useScene';
import { ARButton as ThreeARButton } from 'three/examples/jsm/webxr/ARButton.js';

type ARButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ARButton: React.FC<ARButtonProps> = ({
  children,
  className = '',
  onClick,
  ...restProps
}) => {
  const { renderer } = useScene();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (!renderer) {
      return;
    }

    renderer.xr.enabled = true;
    const checkSupport = async () => {
      if ('xr' in navigator) {
        try {
          const supported = await (navigator.xr as any).isSessionSupported(
            'immersive-ar'
          );
          setIsSupported(supported);
        } catch (e) {
          setIsSupported(false);
        }
      } else {
        setIsSupported(false);
      }
    };

    checkSupport();

    const arButton = ThreeARButton.createButton(renderer);
    arButton.style.cssText = '';
    arButton.className = '';

    Object.assign(arButton.style, {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      background: 'transparent',
      border: 'none',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      zIndex: 10,
    });

    if (buttonRef.current) {
      buttonRef.current.style.position = 'relative';
      buttonRef.current.appendChild(arButton);
    }

    const originalClick = arButton.onclick as ((e: PointerEvent) => void) | null;
    arButton.onclick = (e: PointerEvent) => {
      originalClick?.(e);
      onClick?.();
    };

    return () => {
      if (arButton.parentNode) {
        arButton.parentNode.removeChild(arButton);
      }
    };
  }, [renderer, onClick]);

  const disabledClasses = !isSupported
    ? 'opacity-40! cursor-not-allowed! grayscale!'
    : '';
  return (
    <button
      ref={buttonRef}
      className={`${disabledClasses} ${className}`}
      disabled={!isSupported}
      aria-label={isSupported === false ? 'VR not supported' : 'Enter VR'}
      {...restProps}>
      {children}
    </button>
  );
};

