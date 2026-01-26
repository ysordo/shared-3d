import { THREE } from '../lib/three';
import gsap from 'gsap';
import vertexChunk from './paint.vert';
import fragmentChunk from './paint.frag';

export const setupModelBounds = (model: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(model);
    transitionUniforms.uMinX.value = box.min.x;
    transitionUniforms.uMaxX.value = box.max.x;
};

export const runPaintTransition = (
  newColor: string | THREE.Color,
  isWire: boolean = false,
  isTexture: boolean = false,
  wireLineColor?: string | THREE.Color,
  duration: number = 1200
) => {
  // 1. DETECTAR ESTADO ACTUAL (origen)
  const wasTexture = transitionUniforms.uUseTexture.value > 0.5;
  const wasWire = transitionUniforms.uIsWireMode.value > 0.5;

  // 2. SETEAR DIRECCIÓN CORRECTA: 
  //  1.0 = hacia textura (solid→textured)
  // -1.0 = desde textura (textured→solid)
  //  0.0 = mismo tipo (solid→solid, wire→wire)
  if (wasTexture && !isTexture) {
    transitionUniforms.uToTextureMode.value = -1.0;
  } else if (!wasTexture && isTexture) {
    transitionUniforms.uToTextureMode.value = 1.0;
  } else {
    transitionUniforms.uToTextureMode.value = 0.0;
  }

  // 3. GUARDAR COLORES ORIGEN EN "OLD"
  // Si venimos de textura, no tenemos color "old" definido, así que usamos un neutro
  // o mantenemos el último conocido. Para transiciones suaves textured→solid,
  // idealmente deberías samplear el color dominante de la textura aquí si quieres,
  // pero por ahora usamos el último uColorNew conocido o un gris.
  if (wasTexture) {
    // Opcional: podrías setear un color "viejo" neutral si quieres que siempre 
    // transicione desde un color específico al salir de textura
    // transitionUniforms.uColorOld.value.set('#888888');
  } else {
    // Venimos de solid/wire: los colores actuales son los "Old"
    transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
    transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
  }

  // 4. SETEAR COLORES DESTINO "NEW"
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(newColor);
    if (isWire) {
      transitionUniforms.uWireColorNew.value.set(wireLineColor ?? '#000000');
    }
  }

  // 5. SETEAR MODO OBJETIVO (pero NO actualizamos uUseTexture/uIsWireMode todavía!)
  // El shader usará uToTextureMode para saber qué mezclar.
  // Guardamos el modo objetivo en variables temporales para el onComplete
  const targetUseTexture = isTexture ? 1.0 : 0.0;
  const targetIsWireMode = (!isTexture && isWire) ? 1.0 : 0.0;

  // 6. ANIMACIÓN
  transitionUniforms.uProgress.value = 0;

  const tween = gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1000,
    ease: 'power2.inOut',
    overwrite: 'auto',
    onComplete: () => {
      // Ahora sí actualizamos el estado final real
      transitionUniforms.uUseTexture.value = targetUseTexture;
      transitionUniforms.uIsWireMode.value = targetIsWireMode;
      transitionUniforms.uToTextureMode.value = 0.0; // Resetear dirección
      
      // Sincronizar colores para la próxima transición
      if (!isTexture) {
        transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
        transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
      }
    }
  });

  return tween;
};

export const transitionUniforms = Object.freeze({
    uProgress: { value: 0 },
    uColorNew: { value: new THREE.Color('#ffffff') },
    uColorOld: { value: new THREE.Color('#ffffff') },
    uWireColorNew: { value: new THREE.Color('#000000') },
    uWireColorOld: { value: new THREE.Color('#000000') },
    uIsWireMode: { value: 0.0 },      // Estado ACTUAL (al finalizar transición)
    uUseTexture: { value: 1.0 },      // Estado ACTUAL (al finalizar transición)
    uMinX: { value: 0 },
    uMaxX: { value: 0 },
    uLightIntensity: { value: 1.0 },
    uGlassOpacity: { value: 1.0 },
    uToTextureMode: { value: 0.0 },   // -1, 0, 1 para dirección
});

export const injectShader = (material: THREE.Material) => {
    material.transparent = true;
    material.depthWrite = true;
    
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
            uniform vec3 uWireColorNew;
            uniform vec3 uWireColorOld;
            uniform float uIsWireMode;      // Modo objetivo (wireframe)
            uniform float uUseTexture;      // Modo objetivo (textura)
            uniform float uMinX;
            uniform float uMaxX;
            uniform float uLightIntensity;
            uniform float uGlassOpacity;
            uniform float uToTextureMode;   // -1.0, 0.0, 1.0
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
             reflectedLight.directDiffuse *= uLightIntensity;
             reflectedLight.indirectDiffuse *= uLightIntensity;
             reflectedLight.directSpecular *= uLightIntensity;`
        )
        .replace('#include <color_fragment>', fragmentChunk);
    };
    material.needsUpdate = true;
};