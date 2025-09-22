import * as THREE from 'three';
/**
 * Props for the AmbientLight component.
 * @property {THREE.ColorRepresentation} [color=0xffffff] - Color of the ambient light
 * @property {number} [intensity=1] - Intensity of the ambient light
 * @property {boolean} [visible=true] - Visibility of the ambient light
 * @property {boolean} [castShadow=false] - Whether the light casts shadows
 * @property {(light: THREE.AmbientLight) => void} [onCreated] - Callback when the light is created
 * @typedef {Object} AmbientLightProps
 */
interface AmbientLightProps {
    color?: THREE.ColorRepresentation;
    intensity?: number;
    visible?: boolean;
    castShadow?: boolean;
    onCreated?: (light: THREE.AmbientLight) => void;
}
/**
 * Component to create and manage an ambient light in a 3D scene.
 * @param {AmbientLightProps} props - Component properties
 * @param {THREE.ColorRepresentation} [props.color=0xffffff] - Color of the ambient light
 * @param {number} [props.intensity=1] - Intensity of the ambient light
 * @param {boolean} [props.visible=true] - Visibility of the ambient light
 * @param {boolean} [props.castShadow=false] - Whether the light casts shadows
 * @param {(light: THREE.AmbientLight) => void} [props.onCreated] - Callback when the light is created
 * @returns {null} This component does not render anything directly
 */
export declare function AmbientLight({ color, intensity, visible, castShadow, onCreated }: AmbientLightProps): null;
export {};
//# sourceMappingURL=AmbientLight.d.ts.map