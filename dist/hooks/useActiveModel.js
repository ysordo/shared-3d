'use client';
import { useScene } from './useScene';
export const useActiveModel = () => {
    const orchestrator = useScene();
    return orchestrator.getActiveModel();
};
//# sourceMappingURL=useActiveModel.js.map