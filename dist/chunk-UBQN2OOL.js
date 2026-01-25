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
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Color objetivo del pintado\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    targetRGB = mix(vec3(0.53), uWireColor, clamp(wire, 0.0, 1.0));\n    targetAlpha = 0.95;\n} else {\n    targetRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// Si uUseTexture es 1.0, diffuseColor.rgb contiene la textura original de Three.js\n// Si uUseTexture es 0.0, ignoramos la textura y usamos nuestro targetRGB\nif (uUseTexture > 0.5) {\n    // Aqu\xED puedes decidir si quieres que la textura tambi\xE9n barra o sea instant\xE1nea\n    // Para respetar el modelo original 100%:\n    diffuseColor.a = 1.0;\n} else {\n    diffuseColor.rgb = targetRGB;\n    diffuseColor.a = targetAlpha;\n}\n";

// src/shaders/Paint.ts
var transitionUniforms = {
  uProgress: { value: 0 },
  uColorNew: { value: new THREE.Color("#ffffff") },
  uColorOld: { value: new THREE.Color("#ffffff") },
  uWireColor: { value: new THREE.Color("#000000") },
  uIsWireMode: { value: 0 },
  uUseTexture: { value: 1 },
  // 1.0 usa textura, 0.0 usa color/wire
  uMinX: { value: 0 },
  uMaxX: { value: 0 }
};
var setupModelBounds = (model) => {
  const box = new THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire, duration) => {
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uColorNew.value.set(isWire ? "#888888" : newColor);
  transitionUniforms.uIsWireMode.value = isWire ? 1 : 0;
  return gsap.fromTo(
    transitionUniforms.uProgress,
    { value: 0 },
    {
      value: 1,
      duration: duration / 1e3,
      ease: "power2.inOut",
      overwrite: true
    }
  );
};
var injectShader = (material) => {
  material.transparent = true;
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
            varying float vPosX;
            varying vec2 vUv;

            float getWireframe(vec2 uv) {
                vec2 grid = abs(fract(uv * 20.0 - 0.5) - 0.5) / fwidth(uv * 20.0);
                return 1.0 - min(grid.x, grid.y);
            }
            ${shader.fragmentShader}
        `.replace(
      "#include <color_fragment>",
      paint_default2
      // El archivo .frag que usa uUseTexture
    );
  };
  material.needsUpdate = true;
};

// src/react/controls/MaterialController.tsx
import { jsx } from "react/jsx-runtime";
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 800,
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
      if (!model || isTransitioning) {
        return;
      }
      setOldName(activeName ?? "");
      setNextName(config.name);
      setIsTransitioning(true);
      setPercentage(0);
      const isTextured = config.type === "textured";
      const isWire = config.type === "wireframe";
      transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
      if (!isTextured) {
        const targetColor = config.color?.toString?.() || "#888888";
        const animation = runPaintTransition(
          targetColor,
          isWire,
          transitionDuration
        );
        animation.eventCallback("onUpdate", () => {
          setPercentage(Math.floor(animation.progress() * 100));
        });
        await animation;
      } else {
        setPercentage(100);
      }
      setActiveName(config.name);
      setIsTransitioning(false);
      setPercentage(0);
    },
    [model, isTransitioning, activeName, transitionDuration]
  );
  const items = useMemo(
    () => materials.map((config) => ({
      name: config.name,
      oldName,
      nextName,
      isActive: activeName === config.name,
      percentage: nextName === config.name ? percentage : 0,
      apply: () => applyMaterial(config)
    })),
    [materials, oldName, nextName, activeName, percentage, applyMaterial]
  );
  useEffect(() => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const def = items.find((i) => i.name === activeDefault) || items[0];
    def?.apply?.();
  }, [model, items, activeDefault, activeName]);
  if (!model) {
    return /* @__PURE__ */ jsx("div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ jsx("div", { className, children: children(items, isTransitioning) });
};

export {
  MaterialController
};
