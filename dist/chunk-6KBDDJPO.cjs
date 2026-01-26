"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk76BBOGQKcjs = require('./chunk-76BBOGQK.cjs');


var _chunk7J7CBFY2cjs = require('./chunk-7J7CBFY2.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/MaterialController.tsx






var _react = require('react');

// src/shaders/Paint.ts
var _gsap = require('gsap'); var _gsap2 = _interopRequireDefault(_gsap);

// src/shaders/paint.vert
var paint_default = "vPosX = position.x;\nvUv = uv;\n";

// src/shaders/paint.frag
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Siempre calculamos el color texturado original (si aplica)\nvec3 texturedColor = diffuseColor.rgb;  // Asumiendo que el mapa ya est\xE1 en diffuseColor antes de este chunk\n\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\n// Calculamos el color no-textura (s\xF3lido o wireframe)\nvec3 nonTexturedRGB;\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    vec3 background = mix(uColorNew, uColorOld, effect);\n    vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);\n    nonTexturedRGB = mix(background, lineColor, clamp(wire, 0.0, 1.0));\n    targetAlpha = 0.95;\n} else {\n    nonTexturedRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// DECISI\xD3N FINAL DE COLOR (SIN AMBIG\xDCEDAD)\n\n// Transici\xF3n ACTIVA\nif (uToTextureMode > 0.5) {\n    // yendo HACIA textura\n    targetRGB = mix(nonTexturedRGB, texturedColor, effect);\n}\nelse if (uToTextureMode < 0.0) {\n    // (no usado, pero dejo claro el concepto)\n    targetRGB = mix(texturedColor, nonTexturedRGB, effect);\n}\nelse {\n    // SIN transici\xF3n \u2192 usar modo REAL\n    if (uUseTexture > 0.5) {\n        targetRGB = texturedColor;\n    } else {\n        targetRGB = nonTexturedRGB;\n    }\n}\n\n\n// L\xD3GICA DE SALIDA (ajustada para siempre aplicar targetRGB)\ndiffuseColor.rgb = targetRGB;\ndiffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);";

// src/shaders/Paint.ts
var setupModelBounds = (model) => {
  const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(model);
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
  if (isWire && !isTexture) {
    transitionUniforms.uWireColorNew.value.set(_nullishCoalesce(wireLineColor, () => ( "#000000")));
  }
  transitionUniforms.uProgress.value = 0;
  const tween = _gsap2.default.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    ease: "power2.inOut",
    overwrite: "auto",
    onComplete: () => {
      transitionUniforms.uUseTexture.value = isTexture ? 1 : 0;
      transitionUniforms.uIsWireMode.value = !isTexture && isWire ? 1 : 0;
      transitionUniforms.uToTextureMode.value = 0;
      if (!(transitionUniforms.uUseTexture.value > 0.5)) {
        if (renderer && scene && camera) {
          try {
            const rtSize = 48;
            const rt = new _chunkEA3XQ4KJcjs.THREE.WebGLRenderTarget(rtSize, rtSize, {
              minFilter: _chunkEA3XQ4KJcjs.THREE.LinearFilter,
              magFilter: _chunkEA3XQ4KJcjs.THREE.LinearFilter,
              format: _chunkEA3XQ4KJcjs.THREE.RGBAFormat
            });
            const prevRT = renderer.getRenderTarget();
            const prevClearColor = renderer.getClearColor(new _chunkEA3XQ4KJcjs.THREE.Color());
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
              const finalColor = new _chunkEA3XQ4KJcjs.THREE.Color(
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
        let sumColor = new _chunkEA3XQ4KJcjs.THREE.Color(0, 0, 0);
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
  uColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uWireColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
  uWireColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
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
var _jsxruntime = require('react/jsx-runtime');
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 1200,
  // Ahora se respetará este tiempo real
  children,
  className
}) => {
  const model = _chunk76BBOGQKcjs.useActiveModel.call(void 0, );
  const { scene, camera, renderer } = _chunk7J7CBFY2cjs.useScene.call(void 0, );
  const [activeName, setActiveName] = _react.useState.call(void 0, null);
  const [oldName, setOldName] = _react.useState.call(void 0, "");
  const [nextName, setNextName] = _react.useState.call(void 0, "");
  const [percentage, setPercentage] = _react.useState.call(void 0, 0);
  const [isTransitioning, setIsTransitioning] = _react.useState.call(void 0, false);
  const processedModelRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!model || processedModelRef.current === model) {
      return;
    }
    setupModelBounds(model);
    model.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
        Array.isArray(child.material) ? child.material.forEach(injectShader) : injectShader(child.material);
      }
    });
    processedModelRef.current = model;
  }, [model]);
  const applyMaterial = _react.useCallback.call(void 0, 
    async (config) => {
      if (!model || isTransitioning || config.name === activeName) {
        return;
      }
      setIsTransitioning(true);
      setOldName(_nullishCoalesce(activeName, () => ( "")));
      setNextName(config.name);
      setPercentage(0);
      const isTextured = config.type === "textured";
      const isWire = config.type === "wireframe";
      transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured || config.keepGlass ? 1 : 0;
      if (!isTextured) {
        const targetColor = _optionalChain([config, 'access', _ => _.color, 'optionalAccess', _2 => _2.toString, 'call', _3 => _3()]) || "#888888";
        const animation = runPaintTransition(
          targetColor,
          isWire,
          isTextured,
          _optionalChain([config, 'optionalAccess', _4 => _4.lineColor, 'optionalAccess', _5 => _5.toString, 'call', _6 => _6()]),
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
  const items = _react.useMemo.call(void 0, 
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
  _react.useEffect.call(void 0, () => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const def = items.find((i) => i.name === activeDefault) || items[0];
    if (def) {
      const config = materials.find((m) => m.name === def.name);
      if (config) {
        transitionUniforms.uColorNew.value = "color" in config ? new _chunkEA3XQ4KJcjs.THREE.Color(_optionalChain([config, 'optionalAccess', _7 => _7.color]) || "#888888") : new _chunkEA3XQ4KJcjs.THREE.Color("#888888");
        transitionUniforms.uWireColorNew.value = "lineColor" in config ? new _chunkEA3XQ4KJcjs.THREE.Color(_optionalChain([config, 'optionalAccess', _8 => _8.lineColor]) || "#000000") : new _chunkEA3XQ4KJcjs.THREE.Color("#000000");
        applyMaterial(config);
      }
    }
  }, [model, items, activeDefault, activeName, materials, applyMaterial]);
  if (!model) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items, isTransitioning) });
};



exports.MaterialController = MaterialController;
