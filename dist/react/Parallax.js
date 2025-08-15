import { useEffect } from 'react';
import { useSceneContext } from '..';
export function Parallax({ onEffect }) {
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (!sceneManager) {
            return;
        }
        sceneManager.handleParallaxEffects(onEffect);
    }, [sceneManager, onEffect]);
    return null;
}
//# sourceMappingURL=Parallax.js.map