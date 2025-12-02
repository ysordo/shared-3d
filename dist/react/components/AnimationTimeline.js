/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef } from 'react';
import { useActiveModel } from '../../hooks/useActiveModel';
import { THREE } from '../../lib';
export const AnimationTimeline = ({ steps, loop = false, autoplay = true, }) => {
    const model = useActiveModel();
    const mixerRef = useRef(null);
    const actionsRef = useRef(new Map());
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
//# sourceMappingURL=AnimationTimeline.js.map