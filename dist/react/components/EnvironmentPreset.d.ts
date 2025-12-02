import type React from 'react';
type EnvironmentPresetName = 'studio' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'city' | 'park' | 'lobby';
type EnvironmentPresetProps = {
    name: EnvironmentPresetName;
    intensity?: number;
    blur?: number;
};
export declare const EnvironmentPreset: React.FC<EnvironmentPresetProps>;
export {};
//# sourceMappingURL=EnvironmentPreset.d.ts.map