import { useEffect } from 'react';
import { useSceneContext, type THREE } from '..';

interface ParallaxProps {
    onEffect: (progress: number, effect: (arg0: (mesh: THREE.Object3D)=> void) => void)=>void
}

export function Parallax({onEffect}: ParallaxProps) : null {
    const {sceneManager} = useSceneContext();

    useEffect(()=>{
        if(!sceneManager) {return;}
        sceneManager.handleParallaxEffects(onEffect);
    },[sceneManager, onEffect]);
    
    return null;
}