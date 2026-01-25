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
var paint_default2 = "float normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.1; \nfloat effect = smoothstep(threshold - 0.1, threshold, normX);\n\n// Color objetivo del pintado\nvec3 targetRGB;\nfloat targetAlpha = 1.0;\n\nif (uIsWireMode > 0.5) {\n    float wire = getWireframe(vUv);\n    targetRGB = mix(vec3(0.53), uWireColor, clamp(wire, 0.0, 1.0));\n    targetAlpha = 0.95;\n} else {\n    targetRGB = mix(uColorNew, uColorOld, effect);\n}\n\n// Si uUseTexture es 1.0, diffuseColor.rgb contiene la textura original de Three.js\n// Si uUseTexture es 0.0, ignoramos la textura y usamos nuestro targetRGB\nif (uUseTexture > 0.5) {\n    // Aqu\xED puedes decidir si quieres que la textura tambi\xE9n barra o sea instant\xE1nea\n    // Para respetar el modelo original 100%:\n    diffuseColor.a = 1.0;\n} else {\n    diffuseColor.rgb = targetRGB;\n    diffuseColor.a = targetAlpha;\n}\n";

// src/shaders/Paint.ts
var transitionUniforms = {
  uProgress: { value: 0 },
  uColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uWireColor: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
  uIsWireMode: { value: 0 },
  uUseTexture: { value: 1 },
  // 1.0 usa textura, 0.0 usa color/wire
  uMinX: { value: 0 },
  uMaxX: { value: 0 }
};
var setupModelBounds = (model) => {
  const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(model);
  transitionUniforms.uMinX.value = box.min.x;
  transitionUniforms.uMaxX.value = box.max.x;
};
var runPaintTransition = (newColor, isWire, duration) => {
  transitionUniforms.uColorOld.value.copy(transitionUniforms.uColorNew.value);
  transitionUniforms.uColorNew.value.set(isWire ? "#888888" : newColor);
  transitionUniforms.uIsWireMode.value = isWire ? 1 : 0;
  return _gsap2.default.fromTo(
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
var _jsxruntime = require('react/jsx-runtime');
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 800,
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
      if (!model || isTransitioning) {
        return;
      }
      setOldName(_nullishCoalesce(activeName, () => ( "")));
      setNextName(config.name);
      setIsTransitioning(true);
      setPercentage(0);
      const isTextured = config.type === "textured";
      const isWire = config.type === "wireframe";
      transitionUniforms.uUseTexture.value = isTextured ? 1 : 0;
      if (!isTextured) {
        const targetColor = _optionalChain([config, 'access', _ => _.color, 'optionalAccess', _2 => _2.toString, 'optionalCall', _3 => _3()]) || "#888888";
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
  const items = _react.useMemo.call(void 0, 
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
  _react.useEffect.call(void 0, () => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const def = items.find((i) => i.name === activeDefault) || items[0];
    _optionalChain([def, 'optionalAccess', _4 => _4.apply, 'optionalCall', _5 => _5()]);
  }, [model, items, activeDefault, activeName]);
  if (!model) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items, isTransitioning) });
};



exports.MaterialController = MaterialController;
