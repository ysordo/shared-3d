import {
  useActiveModel
} from "./chunk-V55S5YL6.js";
import {
  useScene
} from "./chunk-NHJD6U4Z.js";
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
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Siempre calculamos el color texturado original (si aplica)\nvec3 texturedColor = diffuseColor.rgb;  // Asumiendo que el mapa ya est\xE1 en diffuseColor antes de este chunk\n\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\n// Calculamos el color no-textura (s\xF3lido o wireframe)\nvec3 nonTexturedRGB;\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    vec3 background = mix(uColorNew, uColorOld, effect);\n    vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);\n    nonTexturedRGB = mix(background, lineColor, clamp(wire, 0.0, 1.0));\n    targetAlpha = 0.95;\n} else {\n    nonTexturedRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// Ahora, manejamos la transici\xF3n basada en modo y direcci\xF3n\nif (uUseTexture > 0.5) {\n    if (uToTextureMode > 0.5) {\n        // Transici\xF3n HACIA textura: mix de no-textura \u2192 textura\n        targetRGB = mix(nonTexturedRGB, texturedColor, effect);\n    } else {\n        targetRGB = texturedColor;  // Modo textura puro (sin transici\xF3n activa)\n    }\n} else {\n    if (uToTextureMode < 0.5) {\n        // Transici\xF3n DESDE textura: mix de textura \u2192 no-textura\n        targetRGB = mix(texturedColor, nonTexturedRGB, effect);\n    } else {\n        targetRGB = nonTexturedRGB;  // Modo no-textura puro\n    }\n}\n\n// L\xD3GICA DE SALIDA (ajustada para siempre aplicar targetRGB)\ndiffuseColor.rgb = targetRGB;\ndiffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);";

// src/shaders/Paint.ts
var setupModelBounds = (model) => {
  const box = new THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire = false, isTexture = false, wireLineColor, duration = 1200, renderer, scene, camera) => {
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
  const wasTexture = transitionUniforms.uUseTexture.value > 0.5;
  transitionUniforms.uToTextureMode.value = isTexture ? 1 : 0;
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(newColor);
  }
  transitionUniforms.uUseTexture.value = isTexture ? 1 : 0;
  if (isWire && !isTexture) {
    transitionUniforms.uWireColorNew.value.set(wireLineColor ?? "#000000");
    transitionUniforms.uIsWireMode.value = 1;
  } else {
    transitionUniforms.uIsWireMode.value = 0;
  }
  transitionUniforms.uProgress.value = 0;
  const tween = gsap.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    ease: "power2.inOut",
    overwrite: "auto",
    onComplete: () => {
      transitionUniforms.uToTextureMode.value = 0;
      if (!(transitionUniforms.uUseTexture.value > 0.5)) {
        if (renderer && scene && camera) {
          try {
            const rtSize = 48;
            const rt = new THREE.WebGLRenderTarget(rtSize, rtSize, {
              minFilter: THREE.LinearFilter,
              magFilter: THREE.LinearFilter,
              format: THREE.RGBAFormat
            });
            const prevRT = renderer.getRenderTarget();
            const prevClearColor = renderer.getClearColor(new THREE.Color());
            const prevClearAlpha = renderer.getClearAlpha();
            renderer.setRenderTarget(rt);
            renderer.setClearColor(0, 0);
            renderer.clear();
            renderer.render(scene, camera);
            const pixels = new Uint8Array(rtSize * rtSize * 4);
            renderer.readRenderTargetPixels(rt, 0, 0, rtSize, rtSize, pixels);
            renderer.setRenderTarget(prevRT);
            renderer.setClearColor(prevClearColor);
            renderer.setClearAlpha(prevClearAlpha);
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < pixels.length; i += 4) {
              const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
              if (brightness > 15) {
                r += pixels[i];
                g += pixels[i + 1];
                b += pixels[i + 2];
                count++;
              }
            }
            if (count > 10) {
              const finalColor = new THREE.Color(
                r / count / 255,
                g / count / 255,
                b / count / 255
              );
              transitionUniforms.uColorNew.value.copy(finalColor);
              transitionUniforms.uColorOld.value.copy(finalColor);
            }
            rt.dispose();
          } catch (err) {
            console.warn("[paint] Captura GPU fall\xF3, usando fallback CPU", err);
            fallbackCPUWeighted();
          }
        } else {
          fallbackCPUWeighted();
        }
      }
      function fallbackCPUWeighted() {
        const samples = 484;
        let sumColor = new THREE.Color(0, 0, 0);
        let totalWeight = 0;
        if (wasTexture) {
          const lineFinal = transitionUniforms.uWireColorNew.value.clone();
          transitionUniforms.uColorNew.value.copy(lineFinal);
          transitionUniforms.uColorOld.value.copy(lineFinal);
          return;
        }
        for (let i = 0; i < samples; i++) {
          const iu = i % 22;
          const iv = Math.floor(i / 22);
          const u = iu / 21;
          const v = iv / 21;
          const cell = 20;
          const gx = Math.abs(fract(u * cell - 0.5) - 0.5);
          const gy = Math.abs(fract(v * cell - 0.5) - 0.5);
          const wireApprox = 1 - Math.min(gx, gy) * cell;
          const clampedWire = Math.max(0, Math.min(1, wireApprox));
          const weight = Math.pow(clampedWire, 1.8);
          const bg = transitionUniforms.uColorNew.value.clone().lerp(
            transitionUniforms.uColorOld.value,
            1
            // effect final = 1
          );
          const line = transitionUniforms.uWireColorOld.value.clone().lerp(
            transitionUniforms.uWireColorNew.value,
            1
          );
          const pixel = bg.clone().lerp(line, clampedWire);
          sumColor.add(pixel.multiplyScalar(weight));
          totalWeight += weight;
        }
        if (totalWeight > 1e-3) {
          sumColor.multiplyScalar(1 / totalWeight);
          transitionUniforms.uColorNew.value.copy(sumColor);
          transitionUniforms.uColorOld.value.copy(sumColor);
        }
      }
    }
  });
  return tween;
};
var fract = (x) => x - Math.floor(x);
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
  uGlassOpacity: { value: 1 },
  // 1.0 = Mantiene cristal, 0.0 = Sólido
  uToTextureMode: { value: 0 }
  // 1.0 = hacia textura, 0.0 = desde textura
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

            uniform float uToTextureMode;

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
  const { scene, camera, renderer } = useScene();
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
          isTextured,
          config?.lineColor?.toString(),
          transitionDuration,
          renderer,
          scene,
          camera
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
