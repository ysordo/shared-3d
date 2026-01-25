import { THREE } from '../lib/three';
import gsap from 'gsap';
import vertexChunk from './paint.vert';
import fragmentChunk from './paint.frag';

export const transitionUniforms = {
    uProgress: { value: 0 },
    uColorNew: { value: new THREE.Color('#ffffff') },
    uColorOld: { value: new THREE.Color('#ffffff') },
    uWireColor: { value: new THREE.Color('#000000') },
    uIsWireMode: { value: 0.0 },
    uUseTexture: { value: 1.0 }, // 1.0 usa textura, 0.0 usa color/wire
    uMinX: { value: 0 },
    uMaxX: { value: 0 }
};

export const setupModelBounds = (model: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(model);
    transitionUniforms.uMinX.value = box.min.x;
    transitionUniforms.uMaxX.value = box.max.x;
};

export const runPaintTransition = (newColor: string, isWire: boolean, duration: number) => {
    transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
    transitionUniforms.uColorNew.value.set(isWire ? '#888888' : newColor);
    transitionUniforms.uIsWireMode.value = isWire ? 1.0 : 0.0;

    // Devolvemos el objeto Tween para que React pueda usar .progress()
    return gsap.fromTo(transitionUniforms.uProgress, 
        { value: 0 }, 
        { 
            value: 1, 
            duration: duration / 1000, 
            ease: 'power2.inOut',
            overwrite: true 
        }
    );
};

export const injectShader = (material: THREE.Material) => {
    material.transparent = true;
    material.onBeforeCompile = (shader) => {
        shader.uniforms = { ...shader.uniforms, ...transitionUniforms };

        shader.vertexShader = `
            varying float vPosX;
            varying vec2 vUv;
            ${shader.vertexShader}
        `.replace('#include <begin_vertex>', `#include <begin_vertex>\n${vertexChunk}`);

        shader.fragmentShader = `
            uniform float uProgress;
            uniform vec3 uColorNew;
            uniform vec3 uColorOld;
            uniform vec3 uWireColor;
            uniform float uIsWireMode;
            uniform float uUseTexture;
            uniform float uMinX;
            uniform float uMaxX;
            varying float vPosX;
            varying vec2 vUv;

            float getWireframe(vec2 uv) {
                vec2 grid = abs(fract(uv * 20.0 - 0.5) - 0.5) / fwidth(uv * 20.0);
                return 1.0 - min(grid.x, grid.y);
            }
            ${shader.fragmentShader}
        `.replace(
            '#include <color_fragment>',
            fragmentChunk // El archivo .frag que usa uUseTexture
        );
    };
    material.needsUpdate = true;
};