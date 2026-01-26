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
var paint_default2 = "// C\xE1lculo del progreso espacial (onda de izquierda a derecha)\nfloat normX = (vPosX - uMinX) / (uMaxX - uMinX);\nfloat threshold = uProgress * 1.2 - 0.1; \n\n// CORREGIDO: 1.0 - smoothstep para que vaya de izquierda (1) a derecha (0)\n// Izquierda (x peque\xF1o) = New (effect=1), Derecha (x grande) = Old (effect=0)\nfloat effect = 1.0 - smoothstep(threshold - 0.15, threshold, normX);\n\n// Color original del material (con textura y propiedades f\xEDsicas intactas)\nvec3 originalColor = diffuseColor.rgb;\nfloat originalAlpha = diffuseColor.a;\n\n// Detectar estado\nbool isTextureMode = uUseTexture > 0.5;\nbool isTransitioning = abs(uTransitionType) > 0.1 || uProgress < 0.99;\n\n// ============================================================================\n// L\xD3GICA DE TRANSICI\xD3N\n// ============================================================================\n\nif (!isTransitioning && isTextureMode) {\n    // MODO TEXTURA PURO: No tocar nada para preservar cristal\n    // diffuseColor se mantiene exactamente como viene\n    \n} else if (uTransitionType > 0.5) {\n    // HACIA TEXTURA (Solid/Wire \u2192 Textured)\n    // Old es s\xF3lido/wire, New es textura (originalColor)\n    \n    vec3 oldSolid = mix(uColorOld, uColorNew, effect); // Interpolaci\xF3n de color base\n    vec3 oldWire = mix(uWireColorOld, uWireColorNew, effect);\n    \n    float oldWireVal = getWireframe(vUv);\n    vec3 oldWireLook = mix(oldSolid, oldWire, clamp(oldWireVal, 0.0, 1.0));\n    \n    // Mezclamos desde el look anterior hacia la textura original\n    diffuseColor.rgb = mix(oldWireLook, originalColor, effect);\n    diffuseColor.a = mix(0.95, originalAlpha, effect);\n    \n} else if (uTransitionType < -0.5) {\n    // DESDE TEXTURA (Textured \u2192 Solid/Wire) \n    // El color destino es FIJO (uColorNew), no interpolado con Old\n    \n    vec3 targetLook;\n    if (uIsWireMode > 0.5) {\n        float w = getWireframe(vUv);\n        targetLook = mix(uColorNew, uWireColorNew, clamp(w, 0.0, 1.0));\n    } else {\n        targetLook = uColorNew;\n    }\n    \n    // Mezclamos desde la textura hacia el objetivo s\xF3lido\n    diffuseColor.rgb = mix(originalColor, targetLook, effect);\n    \n    float targetAlpha = (uIsWireMode > 0.5) ? 0.9 : 1.0;\n    diffuseColor.a = mix(originalAlpha, targetAlpha, effect);\n    \n} else {\n    // ENTRE SOLIDOS/WIRES (Solid\u2192Solid o Wire\u2192Wire)\n    // Aqu\xED interpolamos entre Old y New normalmente\n    \n    if (uIsWireMode > 0.5) {\n        vec3 solidMix = mix(uColorOld, uColorNew, effect);\n        vec3 wireMix = mix(uWireColorOld, uWireColorNew, effect);\n        float w = getWireframe(vUv);\n        diffuseColor.rgb = mix(solidMix, wireMix, clamp(w, 0.0, 1.0));\n        diffuseColor.a = 0.9;\n    } else {\n        diffuseColor.rgb = mix(uColorOld, uColorNew, effect);\n        diffuseColor.a = 1.0;\n    }\n}";

// src/shaders/Paint.ts
var cloneColor = (c) => new _chunkEA3XQ4KJcjs.THREE.Color().copy(c);
var setupModelBounds = (model) => {
  const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(model);
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
      transitionUniforms.uWireColorNew.value.set(_nullishCoalesce(wireLineColor, () => ( "#000000")));
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
  return _gsap2.default.to(transitionUniforms.uProgress, {
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
  uColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#ffffff") },
  uWireColorNew: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
  uWireColorOld: { value: new _chunkEA3XQ4KJcjs.THREE.Color("#000000") },
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
  const [isTransitioning, setIsTransitioning] = _react.useState.call(void 0, false);
  const [percentage, setPercentage] = _react.useState.call(void 0, 0);
  const processedModelRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!model || processedModelRef.current === model) {
      return;
    }
    setupModelBounds(model);
    model.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
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
  const applyMaterial = _react.useCallback.call(void 0, 
    async (config) => {
      if (!model || isTransitioning || config.name === activeName) {
        return;
      }
      setOldName(_nullishCoalesce(activeName, () => ( "")));
      setNextName(config.name);
      setIsTransitioning(true);
      setPercentage(0);
      const isTextured = config.type === "textured";
      const isWire = config.type === "wireframe";
      transitionUniforms.uLightIntensity.value = isTextured || config.keepLight === "default" ? 1 : config.keepLight === "blender" ? 0.6 : 0;
      transitionUniforms.uGlassOpacity.value = isTextured || config.keepGlass ? 1 : 0;
      const meshes = [];
      model.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
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
      const targetColor = isTextured ? "#ffffff" : _optionalChain([config, 'access', _ => _.color, 'optionalAccess', _2 => _2.toString, 'call', _3 => _3()]) || "#888888";
      const lineColor = _optionalChain([config, 'optionalAccess', _4 => _4.lineColor, 'optionalAccess', _5 => _5.toString, 'call', _6 => _6()]);
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
  const items = _react.useMemo.call(void 0, 
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
  _react.useEffect.call(void 0, () => {
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
          const c = new _chunkEA3XQ4KJcjs.THREE.Color(_optionalChain([config, 'access', _7 => _7.color, 'optionalAccess', _8 => _8.toString, 'call', _9 => _9()]) || "#888888");
          transitionUniforms.uColorNew.value.copy(c);
          transitionUniforms.uColorOld.value.copy(c);
          if (config.type === "wireframe") {
            const wc = new _chunkEA3XQ4KJcjs.THREE.Color(
              _optionalChain([config, 'access', _10 => _10.lineColor, 'optionalAccess', _11 => _11.toString, 'call', _12 => _12()]) || "#000000"
            );
            transitionUniforms.uWireColorNew.value.copy(wc);
            transitionUniforms.uWireColorOld.value.copy(wc);
          }
        }
        if (isTextured) {
          model.traverse((child) => {
            if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
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
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items, isTransitioning) });
};



exports.MaterialController = MaterialController;
