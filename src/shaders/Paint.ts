import { THREE } from '../lib/three';
import gsap from 'gsap';
import vertexChunk from './paint.vert';
import fragmentChunk from './paint.frag';

export const setupModelBounds = (model: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(model);
    transitionUniforms.uMinX.value = box.min.x;
    transitionUniforms.uMaxX.value = box.max.x;
};

export const runPaintTransition = (newColor: string, isWire: boolean, duration: number) => {
    // 1. Antes de empezar, el color que era "nuevo" ahora es el "viejo"
    transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
    
    // 2. Seteamos el nuevo color objetivo
    transitionUniforms.uColorNew.value.set(isWire ? '#888888' : newColor);
    transitionUniforms.uIsWireMode.value = isWire ? 1.0 : 0.0;

    // Aseguramos que el progreso empiece en 0 estrictamente
    transitionUniforms.uProgress.value = 0;

    return gsap.to(transitionUniforms.uProgress, {
        value: 1,
        duration: duration / 1000, // 1200 / 1000 = 1.2s
        ease: 'power2.inOut',
        overwrite: 'auto', // Cambiado de true a 'auto' para evitar cancelaciones bruscas
        onUpdate: () => {
            // Si no usas un loop de renderizado (requestAnimationFrame) externo, 
            // podrías necesitar disparar un evento aquí, pero normalmente 
            // el loop de Three.js ya lee el valor actualizado.
        }
    });
};

export const transitionUniforms = {
    uProgress: { value: 0 },
    uColorNew: { value: new THREE.Color('#ffffff') },
    uColorOld: { value: new THREE.Color('#ffffff') },
    uWireColor: { value: new THREE.Color('#000000') },
    uIsWireMode: { value: 0.0 },
    uUseTexture: { value: 1.0 },
    uMinX: { value: 0 },
    uMaxX: { value: 0 },
    uLightIntensity: { value: 1.0 }, // Control de brillo Blender
    uGlassOpacity: { value: 1.0 }    // 1.0 = Mantiene cristal, 0.0 = Sólido
};

export const injectShader = (material: THREE.Material) => {
    material.transparent = true;
    material.depthWrite = true; // Crucial para que el cristal no falle
    
    material.onBeforeCompile = (shader) => {
        shader.uniforms = { ...shader.uniforms, ...transitionUniforms };

        shader.vertexShader = `
            varying float vPosX;
            varying vec2 vUv;
            ${shader.vertexShader}
        `.replace('#include <begin_vertex>', `#include <begin_vertex>\n ${vertexChunk}`);

        shader.fragmentShader = `
            uniform float uProgress;
            uniform vec3 uColorNew;
            uniform vec3 uColorOld;
            uniform vec3 uWireColor;
            uniform float uIsWireMode;
            uniform float uUseTexture;
            uniform float uMinX;
            uniform float uMaxX;
            uniform float uLightIntensity;
            uniform float uGlassOpacity;
            varying float vPosX;
            varying vec2 vUv;

            float getWireframe(vec2 uv) {
                vec2 grid = abs(fract(uv * 20.0 - 0.5) - 0.5) / fwidth(uv * 20.0);
                return 1.0 - min(grid.x, grid.y);
            }
            ${shader.fragmentShader}
        `
        .replace(
            '#include <lights_physical_fragment>',
            `#include <lights_physical_fragment>
             // Reducción de intensidad para look Blender
             reflectedLight.directDiffuse *= uLightIntensity;
             reflectedLight.indirectDiffuse *= uLightIntensity;
             reflectedLight.directSpecular *= uLightIntensity;`
        )
        .replace('#include <color_fragment>', fragmentChunk);
    };
    material.needsUpdate = true;
};
