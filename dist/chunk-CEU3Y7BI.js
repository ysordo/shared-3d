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
var paint_default2 = "// C\xE1lculo del progreso espacial (onda de izquierda a derecha)\nfloat normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.2 - 0.1; \nfloat effect = smoothstep(threshold - 0.15, threshold, normX);\n\n// Color original del material (con textura y propiedades f\xEDsicas intactas)\nvec3 originalColor = diffuseColor.rgb;\nfloat originalAlpha = diffuseColor.a;\n\nvec3 finalColor = originalColor;\nfloat finalAlpha = originalAlpha;\n\n// Detectar si estamos en modo textura puro (sin transici\xF3n activa)\nbool isTextureMode = uUseTexture > 0.5;\nbool isTransitioning = abs(uTransitionType) > 0.1 || (uProgress > 0.01 && uProgress < 0.99);\n\n// ============================================================================\n// L\xD3GICA DE TRANSICI\xD3N\n// ============================================================================\n\nif (!isTransitioning && isTextureMode) {\n    // ------------------------------------------------------------------------\n    // MODO TEXTURA PURO: No tocamos nada, preservamos cristal/transmisi\xF3n original\n    // ------------------------------------------------------------------------\n    finalColor = originalColor;\n    finalAlpha = originalAlpha;\n    \n} else if (uTransitionType > 0.5) {\n    // ------------------------------------------------------------------------\n    // HACIA TEXTURA (Solid/Wire \u2192 Textured)\n    // ------------------------------------------------------------------------\n    vec3 oldSolid = mix(uColorOld, uColorNew, effect);\n    vec3 oldWire = mix(uWireColorOld, uWireColorNew, effect);\n    \n    float oldWireVal = getWireframe(vUv);\n    vec3 oldWireLook = mix(oldSolid, oldWire, clamp(oldWireVal, 0.0, 1.0));\n    \n    // Mezclamos desde el look anterior hacia el original (que incluye transmisi\xF3n)\n    finalColor = mix(oldWireLook, originalColor, effect);\n    finalAlpha = mix(0.95, originalAlpha, effect);\n    \n} else if (uTransitionType < -0.5) {\n    // ------------------------------------------------------------------------\n    // DESDE TEXTURA (Textured \u2192 Solid/Wire) \n    // ------------------------------------------------------------------------\n    // El color destino es FIJO (uColorNew), no interpolado con Old\n    vec3 targetLook;\n    \n    if (uIsWireMode > 0.5) {\n        float w = getWireframe(vUv);\n        targetLook = mix(uColorNew, uWireColorNew, clamp(w, 0.0, 1.0));\n    } else {\n        targetLook = uColorNew;\n    }\n    \n    // Mezclamos desde el color original (con transmisi\xF3n) hacia el s\xF3lido\n    finalColor = mix(originalColor, targetLook, effect);\n    \n    // Interpolamos alpha: desde el original (transparente) hacia s\xF3lido\n    float targetAlpha = (uIsWireMode > 0.5) ? 0.9 : 1.0;\n    finalAlpha = mix(originalAlpha, targetAlpha, effect);\n    \n} else {\n    // ------------------------------------------------------------------------\n    // ENTRE SOLIDOS/WIRES (Solid\u2192Solid o Wire\u2192Wire)\n    // ------------------------------------------------------------------------\n    if (uIsWireMode > 0.5) {\n        vec3 solidMix = mix(uColorOld, uColorNew, effect);\n        vec3 wireMix = mix(uWireColorOld, uWireColorNew, effect);\n        float w = getWireframe(vUv);\n        finalColor = mix(solidMix, wireMix, clamp(w, 0.0, 1.0));\n        finalAlpha = 0.9;\n    } else {\n        finalColor = mix(uColorOld, uColorNew, effect);\n        finalAlpha = 1.0;\n    }\n}\n\n// Aplicar resultado\ndiffuseColor.rgb = finalColor;\ndiffuseColor.a = finalAlpha;";

// src/shaders/Paint.ts
var cloneColor = (color) => new THREE.Color().copy(color);
var setupModelBounds = (model) => {
  const box = new THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (targetColor, isWire = false, isTexture = false, wireLineColor, duration = 1200) => {
  const currentMode = {
    texture: transitionUniforms.uUseTexture.value,
    wire: transitionUniforms.uIsWireMode.value,
    color: cloneColor(transitionUniforms.uColorNew.value),
    wireColor: cloneColor(transitionUniforms.uWireColorNew.value)
  };
  const goingToTexture = isTexture;
  const comingFromTexture = currentMode.texture > 0.5;
  if (comingFromTexture) {
    transitionUniforms.uColorOld.value.copy(currentMode.color);
    transitionUniforms.uWireColorOld.value.copy(currentMode.wireColor);
  } else {
    transitionUniforms.uColorOld.value.copy(currentMode.color);
    transitionUniforms.uWireColorOld.value.copy(currentMode.wireColor);
  }
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(targetColor);
    if (isWire) {
      transitionUniforms.uWireColorNew.value.set(wireLineColor ?? "#000000");
    }
  }
  if (goingToTexture && !comingFromTexture) {
    transitionUniforms.uTransitionType.value = 1;
  } else if (!goingToTexture && comingFromTexture) {
    transitionUniforms.uTransitionType.value = -1;
  } else {
    transitionUniforms.uTransitionType.value = 0;
  }
  const targetMode = {
    texture: isTexture ? 1 : 0,
    wire: !isTexture && isWire ? 1 : 0
  };
  transitionUniforms.uProgress.value = 0;
  return gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    ease: "power2.inOut",
    overwrite: "auto",
    onComplete: () => {
      transitionUniforms.uUseTexture.value = targetMode.texture;
      transitionUniforms.uIsWireMode.value = targetMode.wire;
      transitionUniforms.uTransitionType.value = 0;
      transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
      transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
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
  // Estado REAL actual (post-transición)
  uUseTexture: { value: 1 },
  // Estado REAL actual (post-transición)
  uMinX: { value: 0 },
  uMaxX: { value: 0 },
  uLightIntensity: { value: 1 },
  uGlassOpacity: { value: 1 },
  uTransitionType: { value: 0 }
  // -1, 0, 1
});
var injectShader = (material) => {
  material.transparent = true;
  material.depthWrite = true;
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
  const [percentage, setPercentage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const processedModelRef = useRef(null);
  useEffect(() => {
    if (!model || processedModelRef.current === model) {
      return;
    }
    setupModelBounds(model);
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        Array.isArray(child.material) ? child.material.forEach(injectShader) : injectShader(child.material);
      }
    });
    processedModelRef.current = model;
  }, [model]);
  const applyMaterial = useCallback(
    async (config) => {
      if (!model || isTransitioning || config.name === activeName) {
        return;
      }
      setIsTransitioning(true);
      setOldName(activeName ?? "");
      setNextName(config.name);
      setPercentage(0);
      const isTextured = config.type === "textured";
      const isWire = config.type === "wireframe";
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured || config.keepGlass ? 1 : 0;
      const targetColor = isTextured ? "#ffffff" : config.color?.toString() || "#888888";
      const lineColor = config?.lineColor?.toString();
      const animation = runPaintTransition(
        targetColor,
        isWire,
        isTextured,
        lineColor,
        transitionDuration
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
        const isWire = config.type === "wireframe";
        transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
        transitionUniforms.uIsWireMode.value = !isTextured && isWire ? 1 : 0;
        transitionUniforms.uProgress.value = 1;
        if (!isTextured) {
          const c = new THREE.Color(config.color?.toString() || "#888888");
          transitionUniforms.uColorNew.value.copy(c);
          transitionUniforms.uColorOld.value.copy(c);
          if (isWire) {
            const wc = new THREE.Color(
              config.lineColor?.toString() || "#000000"
            );
            transitionUniforms.uWireColorNew.value.copy(wc);
            transitionUniforms.uWireColorOld.value.copy(wc);
          }
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
