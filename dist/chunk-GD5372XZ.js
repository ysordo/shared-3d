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
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    \n    // El fondo es el color que ya estaba transicionando (uColorOld \u2192 uColorNew)\n    vec3 background = mix(uColorNew, uColorOld, effect);\n    \n    // La l\xEDnea transiciona de forma independiente\n    vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);\n    \n    // Combinamos: donde wire > 0 \u2192 usamos lineColor, donde wire \u2248 0 \u2192 background\n    targetRGB = mix(background, lineColor, clamp(wire, 0.0, 1.0));\n    \n    targetAlpha = 0.95;  // o uWireAlpha si quieres hacerlo configurable despu\xE9s\n} else {\n    // Modo s\xF3lido: sin cambios\n    targetRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// L\xD3GICA DE SALIDA (sin cambios)\nif (uUseTexture > 0.5) {\n    // MODO TEXTURA: respetamos color y transparencia original\n} else {\n    diffuseColor.rgb = targetRGB;\n    diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);\n}";

// src/shaders/Paint.ts
var setupModelBounds = (model) => {
  const box = new THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire = false, wireLineColor, duration = 1200) => {
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
  transitionUniforms.uColorNew.value.set(newColor);
  if (isWire) {
    transitionUniforms.uWireColorNew.value.set(wireLineColor ?? "#000000");
    transitionUniforms.uIsWireMode.value = 1;
  } else {
    transitionUniforms.uIsWireMode.value = 0;
  }
  transitionUniforms.uProgress.value = 0;
  return gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    ease: "power2.inOut",
    overwrite: "auto"
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
  // Control de brillo Blender
  uGlassOpacity: { value: 1 }
  // 1.0 = Mantiene cristal, 0.0 = Sólido
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
      transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured || config.keepGlass ? 1 : 0;
      if (!isTextured) {
        const targetColor = config.color?.toString() || "#888888";
        const animation = runPaintTransition(
          targetColor,
          isWire,
          config?.lineColor?.toString(),
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
        transitionUniforms.uColorNew.value = "color" in config ? new THREE.Color(config?.color || "#888888") : new THREE.Color("#888888");
        transitionUniforms.uWireColorNew.value = "lineColor" in config ? new THREE.Color(config?.lineColor || "#000000") : new THREE.Color("#000000");
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
