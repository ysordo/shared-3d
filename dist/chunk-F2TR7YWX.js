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
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Color objetivo del pintado\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    targetRGB = mix(vec3(0.53), uWireColor, clamp(wire, 0.0, 1.0));\n    targetAlpha = 0.95;\n} else {\n    targetRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// L\xD3GICA DE SALIDA\nif (uUseTexture > 0.5) {\n    // MODO TEXTURA: Respetamos color y transparencia original del mapa\n    // NO tocamos diffuseColor.a para que el cristal funcione\n} else {\n    // MODO S\xD3LIDO / WIREFRAME\n    diffuseColor.rgb = targetRGB;\n    \n    // Si uGlassOpacity es 1.0, mantenemos el alpha original (cristal)\n    // Si es 0.0, usamos targetAlpha (1.0 o 0.95) para hacerlo bloque s\xF3lido\n    diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);\n}\n";

// src/shaders/Paint.ts
var setupModelBounds = (model) => {
  const box = new THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire, duration) => {
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uColorNew.value.set(isWire ? "#888888" : newColor);
  transitionUniforms.uIsWireMode.value = isWire ? 1 : 0;
  transitionUniforms.uProgress.value = 0;
  return gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    // 1200 / 1000 = 1.2s
    ease: "power2.inOut",
    overwrite: "auto",
    // Cambiado de true a 'auto' para evitar cancelaciones bruscas
    onUpdate: () => {
    }
  });
};
var transitionUniforms = {
  uProgress: { value: 0 },
  uColorNew: { value: new THREE.Color("#ffffff") },
  uColorOld: { value: new THREE.Color("#ffffff") },
  uWireColor: { value: new THREE.Color("#000000") },
  uIsWireMode: { value: 0 },
  uUseTexture: { value: 1 },
  uMinX: { value: 0 },
  uMaxX: { value: 0 },
  uLightIntensity: { value: 1 },
  // Control de brillo Blender
  uGlassOpacity: { value: 1 }
  // 1.0 = Mantiene cristal, 0.0 = Sólido
};
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
        `.replace(
      "#include <lights_physical_fragment>",
      `#include <lights_physical_fragment>
             // Reducci\xF3n de intensidad para look Blender
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
  // Ahora se respetará este tiempo real
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
        injectShader(child.material);
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
      transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured ? 1 : config.keepGlass ? 1 : 0;
      if (!isTextured) {
        const targetColor = config.color?.toString() || "#888888";
        const animation = runPaintTransition(
          targetColor,
          isWire,
          transitionDuration
        );
        animation.eventCallback("onUpdate", () => {
          const p = Math.round(animation.progress() * 100);
          setPercentage(p);
        });
        await animation;
      } else {
        setPercentage(100);
      }
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
      // El porcentaje solo se muestra para el item que está transicionando
      percentage,
      apply: () => applyMaterial(config)
    })),
    [materials, oldName, nextName, activeName, percentage, applyMaterial]
  );
  useEffect(() => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const def = items.find((i) => i.name === activeDefault) || items[0];
    if (def) {
      const config = materials.find((m) => m.name === def.name);
      if (config) {
        applyMaterial(config);
      }
    }
  }, [model, items, activeDefault, activeName, materials, applyMaterial]);
  if (!model) {
    return /* @__PURE__ */ jsx("div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ jsx("div", { className, children: children(items, isTransitioning) });
};

export {
  MaterialController
};
