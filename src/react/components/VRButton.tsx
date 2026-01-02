'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScene } from '../hooks/useScene';
import { VRButton as ThreeVRButton } from 'three/examples/jsm/webxr/VRButton.js';

type VRButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const VRButton: React.FC<VRButtonProps> = ({
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
            'immersive-vr'
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

    const vrButton = ThreeVRButton.createButton(renderer);
    vrButton.style.cssText = '';
    vrButton.className = '';

    Object.assign(vrButton.style, {
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
      buttonRef.current.appendChild(vrButton);
    }

    const originalClick = vrButton.onclick as ((e: PointerEvent) => void) | null;
    vrButton.onclick = (e: PointerEvent) => {
      originalClick?.(e);
      onClick?.();
    };

    return () => {
      if (vrButton.parentNode) {
        vrButton.parentNode.removeChild(vrButton);
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
