import React from 'react';
import * as THREE from 'three';

type CustomMaterialFactory = (originalMaterial: THREE.Material) => THREE.Material;
type MaterialConfig = {
    name: string;
    type: 'textured';
} | {
    name: string;
    type: 'solid';
    color?: THREE.ColorRepresentation;
    metalness?: number;
    roughness?: number;
} | {
    name: string;
    type: 'wireframe';
    color?: THREE.ColorRepresentation;
    lineColor?: THREE.ColorRepresentation;
} | {
    name: string;
    type: 'custom';
    factory: CustomMaterialFactory;
};
type MaterialItem = {
    name: string;
    oldName: string;
    apply: () => void;
    isActive: boolean;
    percentage: number;
};
type MaterialControllerProps = {
    /** Configuración de materiales disponibles */
    materials: MaterialConfig[];
    /** Material activo por defecto al cargar el modelo */
    activeDefault?: string;
    /** Duración total de la transición secuencial (ms) */
    transitionDuration?: number;
    /** Render prop que recibe el estado de materiales */
    children: (items: MaterialItem[]) => React.ReactNode;
    className?: string;
};
/**
 * MaterialController
 *
 * Componente declarativo para cambio dinámico y animado de materiales en el modelo activo.
 *
 * Problemas identificados y corregidos:
 * 1. **No renderizado**: Early return `if (!model)` antes de hooks → violación Rules of Hooks.
 * 2. **Estado inicial inconsistente**: `activeName` null hasta primer apply → items con oldName vacío.
 * 3. **Transición secuencial con timeouts dispersos**: Limpieza manual compleja + race conditions.
 * 4. **Wireframe creado en cada render**: Overhead innecesario.
 *
 * Solución:
 * - Hooks siempre en orden (sin early return condicional).
 * - Estado inicial seguro (activeName = activeDefault o primer material).
 * - Transición con RAF suave y cancelable → animación fluida y limpieza robusta.
 * - Wireframe creado una sola vez por mesh.
 * - Renderizado siempre de children con items seguros (incluso sin modelo).
 *
 * @example
 * <MaterialController materials={materialConfigs} activeDefault="textured">
 *   {(items) => (
 *     <div className="fixed top-4 right-4 space-y-2">
 *       {items.map((item) => (
 *         <button
 *           key={item.name}
 *           onClick={item.apply}
 *           disabled={item.isActive}
 *         >
 *           {item.name} {item.isActive && `(${item.percentage.toFixed(0)}%)`}
 *         </button>
 *       ))}
 *     </div>
 *   )}
 * </MaterialController>
 */
declare const MaterialController: React.FC<MaterialControllerProps>;

export { type CustomMaterialFactory, type MaterialConfig, MaterialController };
