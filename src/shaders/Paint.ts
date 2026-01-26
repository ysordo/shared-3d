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
  newColor: string | THREE.Color,     // color base para sólido/wireframe
  isWire: boolean = false,
  isTexture: boolean = false,         // NUEVO: true si modo textura objetivo
  wireLineColor?: string | THREE.Color,
  duration: number = 1200,
  renderer?: THREE.WebGLRenderer,
  scene?: THREE.Scene,
  camera?: THREE.Camera
) => {
  // 1. Guardar estados actuales como "old"
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);

  // 2. Detectar dirección para textura
  const wasTexture = transitionUniforms.uUseTexture.value > 0.5;
  transitionUniforms.uToTextureMode.value = isTexture ? 1.0 : 0.0;

  // 3. Setear valores objetivo
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(newColor);
  }  // Para textura, no seteamos color (respetamos mapa)

  //transitionUniforms.uUseTexture.value = isTexture ? 1.0 : 0.0;
  
  if (isWire && !isTexture) {
    transitionUniforms.uWireColorNew.value.set(wireLineColor ?? '#000000');
    //transitionUniforms.uIsWireMode.value = 1.0;
  } /*else {
    transitionUniforms.uIsWireMode.value = 0.0;
  }*/

  transitionUniforms.uProgress.value = 0;

  const tween = gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1000,
    ease: 'power2.inOut',
    overwrite: 'auto',
    onComplete: () => {
      transitionUniforms.uUseTexture.value = isTexture ? 1.0 : 0.0;
      transitionUniforms.uIsWireMode.value = (!isTexture && isWire) ? 1.0 : 0.0;

      transitionUniforms.uToTextureMode.value = 0.0;

      // Solo intentamos sincronizar color final cuando salimos de un modo NO-textura
      // (es decir: solid/wireframe → cualquier cosa, especialmente → texture o solid)
      if (!(transitionUniforms.uUseTexture.value > 0.5)) {  // estábamos en wire o solid
        if (renderer && scene && camera) {
          // ────────────────────────────────────────────────
          // Opción A - Alta precisión: captura real vía GPU (recomendada si puedes inyectar)
          try {
            const rtSize = 48; // 48×48 suele ser suficiente y rápido
            const rt = new THREE.WebGLRenderTarget(rtSize, rtSize, {
              minFilter: THREE.LinearFilter,
              magFilter: THREE.LinearFilter,
              format: THREE.RGBAFormat,
            });

            const prevRT = renderer.getRenderTarget();
            const prevClearColor = renderer.getClearColor(new THREE.Color());
            const prevClearAlpha = renderer.getClearAlpha();

            renderer.setRenderTarget(rt);
            renderer.setClearColor(0x000000, 0); // fondo transparente/negro para no contaminar
            renderer.clear();

            // Render solo el modelo (idealmente pasa el activeModel como parámetro)
            renderer.render(scene, camera);

            const pixels = new Uint8Array(rtSize * rtSize * 4);
            renderer.readRenderTargetPixels(rt, 0, 0, rtSize, rtSize, pixels);

            renderer.setRenderTarget(prevRT);
            renderer.setClearColor(prevClearColor);
            renderer.setClearAlpha(prevClearAlpha);

            // Promedio ignorando píxeles muy oscuros/transparente
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < pixels.length; i += 4) {
              const brightness = (pixels[i]! + pixels[i+1]! + pixels[i+2]!) / 3;
              if (brightness > 15) { // umbral para evitar contar fondo
                r += pixels[i]!;
                g += pixels[i+1]!;
                b += pixels[i+2]!;
                count++;
              }
            }

            if (count > 10) { // mínimo para considerar válido
              const finalColor = new THREE.Color(
                (r / count) / 255,
                (g / count) / 255,
                (b / count) / 255
              );
              transitionUniforms.uColorNew.value.copy(finalColor);
              transitionUniforms.uColorOld.value.copy(finalColor);
            }

            rt.dispose();
          } catch (err) {
            console.warn('[paint] Captura GPU falló, usando fallback CPU', err);
            fallbackCPUWeighted();
          }
        } else {
          // Sin acceso a renderer → fallback CPU mejorado
          fallbackCPUWeighted();
        }
      }

      // ────────────────────────────────────────────────
      // Fallback CPU mejorado (usado cuando no hay GPU o falla)
      function fallbackCPUWeighted() {
        const samples = 484;          // 22×22 → buen balance precisión/velocidad
        let sumColor = new THREE.Color(0, 0, 0);
        let totalWeight = 0;

        // Si veníamos de textura, no podemos simularla bien → usamos solo el color de línea como aproximación agresiva
        if (wasTexture) {  // necesitas guardar wasTexture antes de setear uUseTexture
          // Caso textured → wireframe: el color "final percibido" tiende a ser más cercano a la línea
          const lineFinal = transitionUniforms.uWireColorNew.value.clone();
          transitionUniforms.uColorNew.value.copy(lineFinal);
          transitionUniforms.uColorOld.value.copy(lineFinal);
          return;
        }

        // Caso solid/wire → wire/solid
        for (let i = 0; i < samples; i++) {
          const iu = i % 22;
          const iv = Math.floor(i / 22);
          const u = iu / 21;
          const v = iv / 21;

          // Aproximación mejorada de getWireframe (sin fwidth → conservador)
          const cell = 20.0;
          const gx = Math.abs(fract(u * cell - 0.5) - 0.5);
          const gy = Math.abs(fract(v * cell - 0.5) - 0.5);
          const wireApprox = 1.0 - Math.min(gx, gy) * cell; // escala inversa aproximada

          const clampedWire = Math.max(0, Math.min(1, wireApprox));

          // Peso no lineal (gamma ~1.6–2.0 para enfatizar zonas con líneas visibles)
          const weight = Math.pow(clampedWire, 1.8);

          const bg = transitionUniforms.uColorNew.value.clone().lerp(
            transitionUniforms.uColorOld.value,
            1.0  // effect final = 1
          );
          const line = transitionUniforms.uWireColorOld.value.clone().lerp(
            transitionUniforms.uWireColorNew.value,
            1.0
          );

          const pixel = bg.clone().lerp(line, clampedWire);
          sumColor.add(pixel.multiplyScalar(weight));
          totalWeight += weight;
        }

        if (totalWeight > 0.001) {
          sumColor.multiplyScalar(1/totalWeight);
          transitionUniforms.uColorNew.value.copy(sumColor);
          transitionUniforms.uColorOld.value.copy(sumColor);
        }
      }
    }
  });

  return tween;
};

const fract = (x: number) => x - Math.floor(x);

export const transitionUniforms = Object.freeze({
    uProgress: { value: 0 },
    uColorNew: { value: new THREE.Color('#ffffff') },
    uColorOld: { value: new THREE.Color('#ffffff') },
    uWireColorNew: { value: new THREE.Color('#000000') },
    uWireColorOld:   { value: new THREE.Color('#000000') },
    uIsWireMode: { value: 0.0 },
    uUseTexture: { value: 1.0 },
    uMinX: { value: 0 },
    uMaxX: { value: 0 },
    uLightIntensity: { value: 1.0 }, // Control de brillo Blender
    uGlassOpacity: { value: 1.0 },    // 1.0 = Mantiene cristal, 0.0 = Sólido
    uToTextureMode: { value: 0.0 },  // 1.0 = hacia textura, 0.0 = desde textura
});

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
            uniform vec3 uWireColorNew;
            uniform vec3 uWireColorOld;
            uniform float uIsWireMode;
            uniform float uUseTexture;
            uniform float uMinX;
            uniform float uMaxX;
            uniform float uLightIntensity;
            uniform float uGlassOpacity;
            varying float vPosX;
            varying vec2 vUv;

            uniform float uToTextureMode;

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
