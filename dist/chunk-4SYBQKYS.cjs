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
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Color objetivo del pintado\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    targetRGB = mix(vec3(0.53), uWireColor, clamp(wire, 0.0, 1.0));\n    targetAlpha = 0.95;\n} else {\n    targetRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// L\xD3GICA DE SALIDA\nif (uUseTexture > 0.5) {\n    // MODO TEXTURA: Respetamos color y transparencia original del mapa\n    // NO tocamos diffuseColor.a para que el cristal funcione\n} else {\n    // MODO S\xD3LIDO / WIREFRAME\n    diffuseColor.rgb = targetRGB;\n    \n    // Si uGlassOpacity es 1.0, mantenemos el alpha original (cristal)\n    // Si es 0.0, usamos targetAlpha (1.0 o 0.95) para hacerlo bloque s\xF3lido\n    diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);\n}\n";

// src/shaders/Paint.ts
var setupModelBounds = (model) => {
  const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire, duration) => {
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uColorNew.value.set(isWire ? "#888888" : newColor);
  transitionUniforms.uIsWireMode.value = isWire ? 1 : 0;
  transitionUniforms.uProgress.value = 0;
  return _gsap2.default.to(transitionUniforms.uProgress, {
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
  uColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uWireColor: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
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
        injectShader(child.material);
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
      transitionUniforms.uGlassOpacity.value = isTextured ? 1 : config.keepGlass ? 1 : 0;
      if (!isTextured) {
        const targetColor = _optionalChain([config, 'access', _ => _.color, 'optionalAccess', _2 => _2.toString, 'call', _3 => _3()]) || "#888888";
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
