"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk76BBOGQKcjs = require('./chunk-76BBOGQK.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/MaterialController.tsx






var _react = require('react');

// src/shaders/Paint.ts
var _gsap = require('gsap'); var _gsap2 = _interopRequireDefault(_gsap);

// src/shaders/paint.vert
var paint_default = "vPosX = position.x;\nvUv = uv;\n";

// src/shaders/paint.frag
var paint_default2 = "// C\xE1lculo del progreso espacial (de izquierda a derecha)\nfloat normX = (vPosX - uMinX) / (uMaxX - uMinX);\n// Ajuste para que la transici\xF3n cubra todo el modelo (1.2) y empiece un poco antes (-0.1)\nfloat threshold = uProgress * 1.2 - 0.1; \n// Zona suave de transici\xF3n (0.1 de ancho)\nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Color original con textura (del material base)\nvec3 texturedColor = diffuseColor.rgb;\nvec3 finalColor;\n\n// ============================================================================\n// L\xD3GICA DE TRANSICI\xD3N CORREGIDA\n// uToTextureMode: \n//   1.0  = Solid/Wire \u2192 Textured (entrando a textura)\n//  -1.0  = Textured \u2192 Solid/Wire (saliendo de textura)  \n//   0.0  = Solid\u2192Solid o Wire\u2192Wire (cambio de color o activaci\xF3n de wireframe)\n// ============================================================================\n\nif (uToTextureMode > 0.5) {\n    // ------------------------------------------------------------------------\n    // CASO 1: Solid/Wire \u2192 Textured\n    // ------------------------------------------------------------------------\n    vec3 solidColor = mix(uColorOld, uColorNew, effect);\n    \n    // Si el modo objetivo es wireframe, calcular l\xEDneas sobre el color s\xF3lido\n    if (uIsWireMode > 0.5) {\n        float wire = getWireframe(vUv);\n        vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);\n        vec3 wireColor = mix(solidColor, lineColor, clamp(wire, 0.0, 1.0));\n        // Mezclamos desde wireColor hacia texturedColor\n        finalColor = mix(wireColor, texturedColor, effect);\n    } else {\n        // Solid puro hacia textura\n        finalColor = mix(solidColor, texturedColor, effect);\n    }\n    \n} else if (uToTextureMode < -0.5) {\n    // ------------------------------------------------------------------------\n    // CASO 2: Textured \u2192 Solid/Wire  \n    // ------------------------------------------------------------------------\n    vec3 targetSolid = mix(uColorOld, uColorNew, effect);\n    \n    if (uIsWireMode > 0.5) {\n        float wire = getWireframe(vUv);\n        vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);\n        vec3 wireColor = mix(targetSolid, lineColor, clamp(wire, 0.0, 1.0));\n        // Mezclamos desde texturedColor hacia wireColor\n        finalColor = mix(texturedColor, wireColor, effect);\n    } else {\n        // Desde textura hacia solid puro\n        finalColor = mix(texturedColor, targetSolid, effect);\n    }\n    \n} else {\n    // ------------------------------------------------------------------------\n    // CASO 3: Transici\xF3n del mismo tipo (Solid\u2192Solid o Wire\u2192Wire)\n    // ------------------------------------------------------------------------\n    if (uIsWireMode > 0.5) {\n        // Modo Wireframe: mezclamos fondo y l\xEDneas\n        float wire = getWireframe(vUv);\n        vec3 bgColor = mix(uColorOld, uColorNew, effect);\n        vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);\n        \n        // La intensidad del wireframe aparece gradualmente con el efecto\n        // Si venimos de s\xF3lido (wire no visible antes), effect controla la aparici\xF3n\n        float wireIntensity = clamp(wire, 0.0, 1.0);\n        \n        finalColor = mix(bgColor, lineColor, wireIntensity);\n    } else {\n        // Modo S\xF3lido puro: solo interpolaci\xF3n de colores\n        finalColor = mix(uColorOld, uColorNew, effect);\n    }\n}\n\n// Aplicar color final\ndiffuseColor.rgb = finalColor;\n\n// Manejo de transparencia (cristal vs s\xF3lido)\n// Cuando uGlassOpacity es 1.0, mantiene el alpha original (cristal)\n// Cuando es 0.0, fuerza alpha 0.95 (s\xF3lido)\nfloat targetAlpha = (uIsWireMode > 0.5) ? 0.95 : 1.0;\ndiffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);";

// src/shaders/Paint.ts
var setupModelBounds = (model) => {
  const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire = false, isTexture = false, wireLineColor, duration = 1200) => {
  const wasTexture = transitionUniforms.uUseTexture.value > 0.5;
  const wasWire = transitionUniforms.uIsWireMode.value > 0.5;
  if (wasTexture && !isTexture) {
    transitionUniforms.uToTextureMode.value = -1;
  } else if (!wasTexture && isTexture) {
    transitionUniforms.uToTextureMode.value = 1;
  } else {
    transitionUniforms.uToTextureMode.value = 0;
  }
  if (wasTexture) {
  } else {
    transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
    transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
  }
  if (!isTexture) {
    transitionUniforms.uColorNew.value.set(newColor);
    if (isWire) {
      transitionUniforms.uWireColorNew.value.set(_nullishCoalesce(wireLineColor, () => ( "#000000")));
    }
  }
  const targetUseTexture = isTexture ? 1 : 0;
  const targetIsWireMode = !isTexture && isWire ? 1 : 0;
  transitionUniforms.uProgress.value = 0;
  const tween = _gsap2.default.to(transitionUniforms.uProgress, {
    value: 1,
    duration: duration / 1e3,
    ease: "power2.inOut",
    overwrite: "auto",
    onComplete: () => {
      transitionUniforms.uUseTexture.value = targetUseTexture;
      transitionUniforms.uIsWireMode.value = targetIsWireMode;
      transitionUniforms.uToTextureMode.value = 0;
      if (!isTexture) {
        transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
        transitionUniforms.uWireColorOld.value.copy(transitionUniforms.uWireColorNew.value);
      }
    }
  });
  return tween;
};
var transitionUniforms = Object.freeze({
  uProgress: { value: 0 },
  uColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uWireColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
  uWireColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
  uIsWireMode: { value: 0 },
  // Estado ACTUAL (al finalizar transición)
  uUseTexture: { value: 1 },
  // Estado ACTUAL (al finalizar transición)
  uMinX: { value: 0 },
  uMaxX: { value: 0 },
  uLightIntensity: { value: 1 },
  uGlassOpacity: { value: 1 },
  uToTextureMode: { value: 0 }
  // -1, 0, 1 para dirección
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
            uniform float uIsWireMode;      // Modo objetivo (wireframe)
            uniform float uUseTexture;      // Modo objetivo (textura)
            uniform float uMinX;
            uniform float uMaxX;
            uniform float uLightIntensity;
            uniform float uGlassOpacity;
            uniform float uToTextureMode;   // -1.0, 0.0, 1.0
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
var _jsxruntime = require('react/jsx-runtime');
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 1200,
  children,
  className
}) => {
  const model = _chunk76BBOGQKcjs.useActiveModel.call(void 0, );
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
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured || config.keepGlass ? 1 : 0;
      if (!isTextured) {
        const targetColor = _optionalChain([config, 'access', _ => _.color, 'optionalAccess', _2 => _2.toString, 'call', _3 => _3()]) || "#888888";
        const lineColor = _optionalChain([config, 'optionalAccess', _4 => _4.lineColor, 'optionalAccess', _5 => _5.toString, 'call', _6 => _6()]);
        const animation = runPaintTransition(
          targetColor,
          isWire,
          isTextured,
          lineColor,
          transitionDuration
        );
        animation.eventCallback("onUpdate", () => {
          const p = Math.round(animation.progress() * 100);
          setPercentage(p);
        });
        await animation;
      } else {
        const animation = runPaintTransition(
          "#ffffff",
          // No se usa pero necesario para la firma
          false,
          true,
          void 0,
          transitionDuration
        );
        animation.eventCallback("onUpdate", () => {
          setPercentage(Math.round(animation.progress() * 100));
        });
        await animation;
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
        const isTextured = config.type === "textured";
        const isWire = config.type === "wireframe";
        transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
        transitionUniforms.uIsWireMode.value = !isTextured && isWire ? 1 : 0;
        if (!isTextured) {
          transitionUniforms.uColorNew.value.set(
            _optionalChain([config, 'access', _7 => _7.color, 'optionalAccess', _8 => _8.toString, 'call', _9 => _9()]) || "#888888"
          );
          transitionUniforms.uColorOld.value.copy(
            transitionUniforms.uColorNew.value
          );
          if (isWire) {
            transitionUniforms.uWireColorNew.value.set(
              _optionalChain([config, 'access', _10 => _10.lineColor, 'optionalAccess', _11 => _11.toString, 'call', _12 => _12()]) || "#000000"
            );
            transitionUniforms.uWireColorOld.value.copy(
              transitionUniforms.uWireColorNew.value
            );
          }
        }
        setActiveName(config.name);
      }
    }
  }, [model, items, activeDefault, activeName, materials]);
  if (!model) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items, isTransitioning) });
};



exports.MaterialController = MaterialController;
