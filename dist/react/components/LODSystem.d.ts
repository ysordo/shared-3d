import * as THREE from 'three';

type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODSystemProps = {
    levels: LODLevel[];
    hysteresis?: number;
    enabled?: boolean;
};
/**
 * LODSystem
 *
 * Componente declarativo para Level of Detail manual basado en modelos predefinidos.
 *
 * Corrección clave:
 * - Eliminado return temprano condicional → evita violación de Rules of Hooks.
 * - Instalación del plugin controlada mediante config.enabled → usePlugin decide si crear o no (hot-update a enabled: false deshabilita internamente).
 * - Mantiene zero overhead cuando enabled=false (plugin no se crea o se deshabilita en caliente).
 *
 * @example
 * <LODSystem
 *   enabled={isLODActive}
 *   hysteresis={0.15}
 *   levels={[...]}
 * />
 */
declare const LODSystem: React.FC<LODSystemProps>;

export { LODSystem };
