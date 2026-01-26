import {
  useActiveModel
} from "./chunk-V55S5YL6.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/controls/MaterialController.tsx
import {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState
} from "react";

// src/shaders/Paint.ts
import gsap from "gsap";

// src/shaders/paint.vert
var paint_default = "vPosX = position.x;\nvUv = uv;\n";

// src/shaders/paint.frag
var paint_default2 = "// C\xE1lculo del progreso espacial (onda de izquierda a derecha)\nfloat normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.2 - 0.1; \n\n// CORREGIDO: 1.0 - smoothstep para que vaya de izquierda (1) a derecha (0)\n// Izquierda (x peque\xF1o) = New (effect=1), Derecha (x grande) = Old (effect=0)\nfloat effect = 1.0 - smoothstep(threshold - 0.15, threshold, normX);\n\n// Color original del material (con textura y propiedades f\xEDsicas intactas)\nvec3 originalColor = diffuseColor.rgb;\nfloat originalAlpha = diffuseColor.a;\n\n// Detectar estado\nbool isTextureMode = uUseTexture > 0.5;\nbool isTransitioning = abs(uTransitionType) > 0.1 || uProgress < 0.99;\n\n// ============================================================================\n// L\xD3GICA DE TRANSICI\xD3N\n// ============================================================================\n\nif (!isTransitioning && isTextureMode) {\n    // MODO TEXTURA PURO: No tocar nada para preservar cristal\n    // diffuseColor se mantiene exactamente como viene\n    \n} else if (uTransitionType > 0.5) {\n    // HACIA TEXTURA (Solid/Wire \u2192 Textured)\n    // Old es s\xF3lido/wire, New es textura (originalColor)\n    \n    vec3 oldSolid = mix(uColorOld, uColorNew, effect); // Interpolaci\xF3n de color base\n    vec3 oldWire = mix(uWireColorOld, uWireColorNew, effect);\n    \n    float oldWireVal = getWireframe(vUv);\n    vec3 oldWireLook = mix(oldSolid, oldWire, clamp(oldWireVal, 0.0, 1.0));\n    \n    // Mezclamos desde el look anterior hacia la textura original\n    diffuseColor.rgb = mix(oldWireLook, originalColor, effect);\n    diffuseColor.a = mix(0.95, originalAlpha, effect);\n    \n} else if (uTransitionType < -0.5) {\n    // DESDE TEXTURA (Textured \u2192 Solid/Wire) \n    // El color destino es FIJO (uColorNew), no interpolado con Old\n    \n    vec3 targetLook;\n    if (uIsWireMode > 0.5) {\n        float w = getWireframe(vUv);\n        targetLook = mix(uColorNew, uWireColorNew, clamp(w, 0.0, 1.0));\n    } else {\n        targetLook = uColorNew;\n    }\n    \n    // Mezclamos desde la textura hacia el objetivo s\xF3lido\n    diffuseColor.rgb = mix(originalColor, targetLook, effect);\n    \n    float targetAlpha = (uIsWireMode > 0.5) ? 0.9 : 1.0;\n    diffuseColor.a = mix(originalAlpha, targetAlpha, effect);\n    \n} else {\n    // ENTRE SOLIDOS/WIRES (Solid\u2192Solid o Wire\u2192Wire)\n    // Aqu\xED interpolamos entre Old y New normalmente\n    \n    if (uIsWireMode > 0.5) {\n        vec3 solidMix = mix(uColorOld, uColorNew, effect);\n        vec3 wireMix = mix(uWireColorOld, uWireColorNew, effect);\n        float w = getWireframe(vUv);\n        diffuseColor.rgb = mix(solidMix, wireMix, clamp(w, 0.0, 1.0));\n        diffuseColor.a = 0.9;\n    } else {\n        diffuseColor.rgb = mix(uColorOld, uColorNew, effect);\n        diffuseColor.a = 1.0;\n    }\n}";

// src/shaders/Paint.ts
var cloneColor = (c) => new THREE.Color().copy(c);
var setupModelBounds = (model) => {
  const box = new THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var currentTransitionId = 0;
var runPaintTransition = (targetColor, isWire = false, isTexture = false, wireLineColor, duration = 1200, meshes) => {
  const thisTransitionId = ++currentTransitionId;
  const currentColor = cloneColor(transitionUniforms.uColorNew.value);
  const currentWireColor = cloneColor(transitionUniforms.uWireColorNew.value);
  const wasTexture = transitionUniforms.uUseTexture.value > 0.5;
  const goingToTexture = isTexture;
  const comingFromTexture = wasTexture;
  if (goingToTexture && !comingFromTexture) {
    transitionUniforms.uTransitionType.value = 1;
  } else if (!goingToTexture && comingFromTexture) {
    transitionUniforms.uTransitionType.value = -1;
  } else {
    transitionUniforms.uTransitionType.value = 0;
  }
  transitionUniforms.uColorOld.value.copy(currentColor);
  transitionUniforms.uWireColorOld.value.copy(currentWireColor);
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(targetColor);
    if (isWire) {
      transitionUniforms.uWireColorNew.value.set(wireLineColor ?? "#000000");
    }
  }
  const targetMode = {
    texture: isTexture ? 1 : 0,
    wire: !isTexture && isWire ? 1 : 0
  };
  if (meshes) {
    meshes.forEach((mesh) => {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((mat) => {
        if (!mat.userData.originalProps) {
          mat.userData.originalProps = {
            transparent: mat.transparent,
            depthWrite: mat.depthWrite,
            opacity: mat.opacity
          };
        }
        mat.transparent = true;
        mat.depthWrite = true;
      });
    });
  }
  transitionUniforms.uProgress.value = 0;
  return gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    ease: "power2.inOut",
    overwrite: "auto",
    onComplete: () => {
      if (thisTransitionId !== currentTransitionId) {
        return;
      }
      transitionUniforms.uUseTexture.value = targetMode.texture;
      transitionUniforms.uIsWireMode.value = targetMode.wire;
      transitionUniforms.uTransitionType.value = 0;
      if (isTexture && meshes) {
        meshes.forEach((mesh) => {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            if (mat.userData.originalProps) {
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
var transitionUniforms = Object.freeze({
  uProgress: { value: 0 },
  uColorNew: { value: new THREE.Color("#ffffff") },
  uColorOld: { value: new THREE.Color("#ffffff") },
  uWireColorNew: { value: new THREE.Color("#000000") },
  uWireColorOld: { value: new THREE.Color("#000000") },
  uIsWireMode: { value: 0 },
  uUseTexture: { value: 1 },
  uMinX: { value: 0 },
  uMaxX: { value: 0 },
  uLightIntensity: { value: 1 },
  uGlassOpacity: { value: 1 },
  uTransitionType: { value: 0 }
});
var injectShader = (material) => {
  if (!material.userData.originalProps) {
    material.userData.originalProps = {
      transparent: material.transparent,
      depthWrite: material.depthWrite,
      opacity: material.opacity
    };
  }
  material.onBeforeCompile = (shader) => {
    shader.uniforms = { ...shader.uniforms, ...transitionUniforms };
    shader.vertexShader = `
            varying float vPosX;
            varying vec2 vUv;
            ${shader.vertexShader}
        `.replace("#include <begin_vertex>", `#include <begin_vertex>
 ${paint_default}`);
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
        `.replace(
      "#include <lights_physical_fragment>",
      `#include <lights_physical_fragment>
             reflectedLight.directDiffuse *= uLightIntensity;
             reflectedLight.indirectDiffuse *= uLightIntensity;
             reflectedLight.directSpecular *= uLightIntensity;`
    ).replace("#include <color_fragment>", paint_default2);
  };
  material.needsUpdate = true;
};

// src/react/controls/MaterialController.tsx
import { jsx } from "react/jsx-runtime";
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 1200,
  children,
  className
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState(null);
  const [oldName, setOldName] = useState("");
  const [nextName, setNextName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const processedModelRef = useRef(null);
  useEffect(() => {
    if (!model || processedModelRef.current === model) {
      return;
    }
    setupModelBounds(model);
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData.originalMaterial = child.material;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          injectShader(mat);
          if (mat.userData.originalProps) {
            mat.depthWrite = mat.userData.originalProps.depthWrite;
          }
        });
      }
    });
    processedModelRef.current = model;
  }, [model]);
  const applyMaterial = useCallback(
    async (config) => {
      if (!model || isTransitioning || config.name === activeName) {
        return;
      }
      setOldName(activeName ?? "");
      setNextName(config.name);
      setIsTransitioning(true);
      setPercentage(0);
      const isTextured = config.type === "textured";
      const isWire = config.type === "wireframe";
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured || config.keepGlass ? 1 : 0;
      const meshes = [];
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (Array.isArray(child.userData.originalMaterial)) {
            child.userData.originalMaterial.map(
              (mat, idx) => {
                const t = mat.clone();
                if ("metalness" in t) {
                  child.material[idx].metalness = "metalness" in config ? config.metalness : t.metalness;
                }
                if ("roughness" in t) {
                  child.material[idx].roughness = "roughness" in config ? config.roughness : t.roughness;
                }
              }
            );
          } else {
            const t = child.userData.originalMaterial.clone();
            if ("metalness" in t) {
              child.material.metalness = "metalness" in config ? config.metalness : t.metalness;
            }
            if ("roughness" in t) {
              child.material.roughness = "roughness" in config ? config.roughness : t.roughness;
            }
          }
          meshes.push(child);
        }
      });
      const targetColor = isTextured ? "#ffffff" : config.color?.toString() || "#888888";
      const lineColor = config?.lineColor?.toString();
      const animation = runPaintTransition(
        targetColor,
        isWire,
        isTextured,
        lineColor,
        transitionDuration,
        meshes
        // Pasar meshes para restaurar props
      );
      animation.eventCallback("onUpdate", () => {
        setPercentage(Math.round(animation.progress() * 100));
      });
      await animation;
      setActiveName(config.name);
      setIsTransitioning(false);
    },
    [model, isTransitioning, activeName, transitionDuration]
  );
  const items = useMemo(
    () => materials.map((config) => ({
      name: config.name,
      oldName,
      nextName,
      isActive: activeName === config.name,
      percentage: activeName === config.name ? 100 : isTransitioning && nextName === config.name ? percentage : 0,
      apply: () => applyMaterial(config)
    })),
    [
      materials,
      oldName,
      nextName,
      activeName,
      percentage,
      isTransitioning,
      applyMaterial
    ]
  );
  useEffect(() => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const def = items.find((i) => i.name === activeDefault) || items[0];
    if (def) {
      const config = materials.find((m) => m.name === def.name);
      if (config) {
        const isTextured = config.type === "textured";
        transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
        transitionUniforms.uIsWireMode.value = !isTextured && config.type === "wireframe" ? 1 : 0;
        transitionUniforms.uProgress.value = 1;
        transitionUniforms.uTransitionType.value = 0;
        if (!isTextured) {
          const c = new THREE.Color(config.color?.toString() || "#888888");
          transitionUniforms.uColorNew.value.copy(c);
          transitionUniforms.uColorOld.value.copy(c);
          if (config.type === "wireframe") {
            const wc = new THREE.Color(
              config.lineColor?.toString() || "#000000"
            );
            transitionUniforms.uWireColorNew.value.copy(wc);
            transitionUniforms.uWireColorOld.value.copy(wc);
          }
        }
        if (isTextured) {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((mat) => {
                if (mat.userData.originalProps) {
                  mat.transparent = mat.userData.originalProps.transparent;
                  mat.depthWrite = mat.userData.originalProps.depthWrite;
                  mat.needsUpdate = true;
                }
              });
            }
          });
        }
        setActiveName(config.name);
      }
    }
  }, [model, items, activeDefault, activeName, materials]);
  if (!model) {
    return /* @__PURE__ */ jsx("div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ jsx("div", { className, children: children(items, isTransitioning) });
};

export {
  MaterialController
};
