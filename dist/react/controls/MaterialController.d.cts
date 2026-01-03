import React from 'react';
import * as THREE from 'three';

type CustomMaterialFactory = (originalMaterial: THREE.Material) => THREE.Material;
type Texture = {
    name: string;
    type: 'textured';
};
type Solid = Omit<Texture, 'type'> & {
    type: 'solid';
    color?: THREE.ColorRepresentation;
    metalness?: number;
    roughness?: number;
};
type Wireframe = Omit<Solid, 'type'> & {
    type: 'wireframe';
    lineColor?: THREE.ColorRepresentation;
};
type MaterialConfig = Texture | Solid | Wireframe | {
    name: string;
    type: 'custom';
    factory: CustomMaterialFactory;
};
type MaterialItem = {
    name: string;
    oldName: string;
    nextName: string;
    apply: () => void;
    isActive: boolean;
    percentage: number;
};
type MaterialControllerProps = {
    materials: MaterialConfig[];
    activeDefault?: string;
    transitionDuration?: number;
    children: (items: MaterialItem[], isTransitioning?: boolean) => React.ReactNode;
    className?: string;
};
/**
 * MaterialController
 *
 * Componente declarativo para cambio dinámico y animado de materiales en el modelo activo.
 *
 * Problemas identificados y corregidos:
 * 1. **No renderizado**: Early return `if (!model)` antes de hooks → violación Rules of Hooks.
 * 2. **Estado inicial inconsistente**: `activeName` null hasta primer apply → items con prevName vacío.
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
