import { THREE } from '../lib/three';
import gsap from 'gsap';
import vertexChunk from './paint.vert';
import fragmentChunk from './paint.frag';

// Helper para clonar colores de forma segura
const cloneColor = (color: THREE.Color) => new THREE.Color().copy(color);

export const setupModelBounds = (model: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(model);
    transitionUniforms.uMinX.value = box.min.x;
    transitionUniforms.uMaxX.value = box.max.x;
};

export const runPaintTransition = (
  targetColor: string | THREE.Color,
  isWire: boolean = false,
  isTexture: boolean = false,
  wireLineColor?: string | THREE.Color,
  duration: number = 1200
) => {
  // 1. CAPTURAR ESTADO ACTUAL EXACTO (antes de tocar nada)
  const currentMode = {
    texture: transitionUniforms.uUseTexture.value,
    wire: transitionUniforms.uIsWireMode.value,
    color: cloneColor(transitionUniforms.uColorNew.value),
    wireColor: cloneColor(transitionUniforms.uWireColorNew.value)
  };

  // 2. DETERMINAR DIRECCIÓN
  const goingToTexture = isTexture;
  const comingFromTexture = currentMode.texture > 0.5;
  
  // 3. SETEAR VALORES "OLD" (desde dónde partimos)
  if (comingFromTexture) {
    // Si venimos de textura, usamos un color neutro o el último solid conocido
    // como punto de partida visual. Usamos gris medio si no hay histórico.
    transitionUniforms.uColorOld.value.copy(currentMode.color);
    transitionUniforms.uWireColorOld.value.copy(currentMode.wireColor);
  } else {
    // Venimos de solid/wire: capturamos exactamente lo que se ve ahora
    transitionUniforms.uColorOld.value.copy(currentMode.color);
    transitionUniforms.uWireColorOld.value.copy(currentMode.wireColor);
  }

  // 4. SETEAR VALORES "NEW" (hacia dónde vamos)
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(targetColor);
    if (isWire) {
      transitionUniforms.uWireColorNew.value.set(wireLineColor ?? '#000000');
    }
  }

  // 5. CONFIGURAR MODO DE TRANSICIÓN PARA EL SHADER
  // 0 = Solid/Solid o Wire/Wire (mismo tipo)
  // 1 = Hacia Textura (cualquier modo → texture)
  // -1 = Desde Textura (texture → cualquier modo)
  if (goingToTexture && !comingFromTexture) {
    transitionUniforms.uTransitionType.value = 1.0;
  } else if (!goingToTexture && comingFromTexture) {
    transitionUniforms.uTransitionType.value = -1.0;
  } else {
    transitionUniforms.uTransitionType.value = 0.0;
  }

  // 6. GUARDAR MODO OBJETIVO PARA EL FINAL
  const targetMode = {
    texture: isTexture ? 1.0 : 0.0,
    wire: (!isTexture && isWire) ? 1.0 : 0.0
  };

  // 7. ANIMACIÓN
  transitionUniforms.uProgress.value = 0;

  return gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1000,
    ease: 'power2.inOut',
    overwrite: 'auto',
    onComplete: () => {
      transitionUniforms.uUseTexture.value = targetMode.texture;
      transitionUniforms.uIsWireMode.value = targetMode.wire;
      transitionUniforms.uTransitionType.value = 0.0;
      
      // Sincronizar: después de cualquier transición, Old = New
      // Esto asegura que la próxima transición Solid→Solid parta del color correcto
      transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
      transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
    }
  });
};

export const transitionUniforms = Object.freeze({
    uProgress: { value: 0 },
    uColorNew: { value: new THREE.Color('#ffffff') },
    uColorOld: { value: new THREE.Color('#ffffff') },
    uWireColorNew: { value: new THREE.Color('#000000') },
    uWireColorOld: { value: new THREE.Color('#000000') },
    uIsWireMode: { value: 0.0 },        // Estado REAL actual (post-transición)
    uUseTexture: { value: 1.0 },        // Estado REAL actual (post-transición)
    uMinX: { value: 0 },
    uMaxX: { value: 0 },
    uLightIntensity: { value: 1.0 },
    uGlassOpacity: { value: 1.0 },
    uTransitionType: { value: 0.0 },    // -1, 0, 1
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
            uniform float uIsWireMode;
            uniform float uUseTexture;
            uniform float uMinX;
            uniform float uMaxX;
            uniform float uLightIntensity;
            uniform float uGlassOpacity;
            uniform float uTransitionType;
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