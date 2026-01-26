import { THREE } from '../lib/three';
import gsap from 'gsap';
import vertexChunk from './paint.vert';
import fragmentChunk from './paint.frag';

const cloneColor = (c: THREE.Color) => new THREE.Color().copy(c);

export const setupModelBounds = (model: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(model);
    transitionUniforms.uMinX.value = box.min.x;
    transitionUniforms.uMaxX.value = box.max.x;
};

let currentTransitionId = 0;

export const runPaintTransition = (
  targetColor: string | THREE.Color,
  isWire: boolean = false,
  isTexture: boolean = false,
  wireLineColor?: string | THREE.Color,
  duration: number = 1200,
  meshes?: THREE.Mesh[]
) => {
  const thisTransitionId = ++currentTransitionId;
  
  const currentColor = cloneColor(transitionUniforms.uColorNew.value);
  const currentWireColor = cloneColor(transitionUniforms.uWireColorNew.value);
  const wasTexture = transitionUniforms.uUseTexture.value > 0.5;
  
  const goingToTexture = isTexture;
  const comingFromTexture = wasTexture;
  
  if (goingToTexture && !comingFromTexture) {
    transitionUniforms.uTransitionType.value = 1.0;
  } else if (!goingToTexture && comingFromTexture) {
    transitionUniforms.uTransitionType.value = -1.0;
  } else {
    transitionUniforms.uTransitionType.value = 0.0;
  }

  transitionUniforms.uColorOld.value.copy(currentColor);
  transitionUniforms.uWireColorOld.value.copy(currentWireColor);

  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(targetColor);
    if (isWire) {
      transitionUniforms.uWireColorNew.value.set(wireLineColor ?? '#000000');
    }
  }

  const targetMode = {
    texture: isTexture ? 1.0 : 0.0,
    wire: (!isTexture && isWire) ? 1.0 : 0.0
  };

  // FORZAR TRANSPARENT DURANTE LA TRANSICIÓN (para que la mezcla funcione)
  if (meshes) {
    meshes.forEach(mesh => {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach(mat => {
        if (!mat.userData.originalProps) {
          mat.userData.originalProps = {
            transparent: mat.transparent,
            depthWrite: mat.depthWrite,
            opacity: mat.opacity
          };
        }
        // Forzar transparent durante la transición para permitir mezcla
        mat.transparent = true;
        mat.depthWrite = true;
      });
    });
  }

  transitionUniforms.uProgress.value = 0;

  return gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1000,
    ease: 'power2.inOut',
    overwrite: 'auto',
    onComplete: () => {
      if (thisTransitionId !== currentTransitionId) {return;}
      
      transitionUniforms.uUseTexture.value = targetMode.texture;
      transitionUniforms.uIsWireMode.value = targetMode.wire;
      transitionUniforms.uTransitionType.value = 0.0;
      
      // RESTAURAR PROPIEDADES ORIGINALES SI VOLVEMOS A TEXTURA
      if (isTexture && meshes) {
        meshes.forEach(mesh => {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach(mat => {
            if (mat.userData.originalProps) {
              // CRÍTICO: Restaurar transparent y depthWrite para que el cristal funcione
              mat.transparent = mat.userData.originalProps.transparent;
              mat.depthWrite = mat.userData.originalProps.depthWrite;
              mat.needsUpdate = true;
            }
          });
        });
      }
      
      if (!isTexture) {
        transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
        transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
      }
    }
  });
};

export const transitionUniforms = Object.freeze({
    uProgress: { value: 0 },
    uColorNew: { value: new THREE.Color('#ffffff') },
    uColorOld: { value: new THREE.Color('#ffffff') },
    uWireColorNew: { value: new THREE.Color('#000000') },
    uWireColorOld: { value: new THREE.Color('#000000') },
    uIsWireMode: { value: 0.0 },
    uUseTexture: { value: 1.0 },
    uMinX: { value: 0 },
    uMaxX: { value: 0 },
    uLightIntensity: { value: 1.0 },
    uGlassOpacity: { value: 1.0 },
    uTransitionType: { value: 0.0 },
});

export const injectShader = (material: THREE.Material) => {
    // Guardar props originales solo una vez
    if (!material.userData.originalProps) {
        material.userData.originalProps = {
            transparent: material.transparent,
            depthWrite: material.depthWrite,
            opacity: material.opacity
        };
    }
    
    // NO forzar transparent aquí. El shader funcionará igual porque 
    // en modo textura puro no modificamos el color/alpha.
    // El transparent se fuerza solo durante la transición.
    
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