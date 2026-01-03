"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkCUEKVN7Qcjs = require('./chunk-CUEKVN7Q.cjs');


var _chunkGICX4QCOcjs = require('./chunk-GICX4QCO.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/MaterialController.tsx






var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var TEXTURE_PROPS = [
  "map",
  "alphaMap",
  "metalnessMap",
  "roughnessMap",
  "specularMap",
  "clearcoatMap",
  "clearcoatNormalMap",
  "clearcoatRoughnessMap",
  "sheenColorMap",
  "sheenRoughnessMap",
  "transmissionMap",
  "thicknessMap"
];
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 300,
  children,
  className
}) => {
  const model = _chunkCUEKVN7Qcjs.useActiveModel.call(void 0, );
  const [activeName, setActiveName] = _react.useState.call(void 0, null);
  const [oldName, setOldName] = _react.useState.call(void 0, "");
  const [nextName, setNextName] = _react.useState.call(void 0, "");
  const [isTransitioning, setIsTransitioning] = _react.useState.call(void 0, false);
  const [percentage, setPercentage] = _react.useState.call(void 0, 0);
  const meshesRef = _react.useRef.call(void 0, []);
  const processedModelRef = _react.useRef.call(void 0, null);
  const timeoutsRef = _react.useRef.call(void 0, []);
  _react.useEffect.call(void 0, () => {
    if (!model) {
      meshesRef.current = [];
      processedModelRef.current = null;
      return;
    }
    if (processedModelRef.current === model) {
      return;
    }
    meshesRef.current = [];
    model.traverse((child) => {
      if (!(child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh)) {
        return;
      }
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material.clone();
      }
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = _chunkGICX4QCOcjs.createQuadWireframe.call(void 0, child.geometry);
        const lineMat = new _chunkEA3XQ4KJcjs.THREE.LineBasicMaterial({
          color: 0,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1
        });
        const wireframe = new _chunkEA3XQ4KJcjs.THREE.LineSegments(wireGeo, lineMat);
        wireframe.name = `${child.name}-wireframe`;
        wireframe.renderOrder = 999;
        wireframe.visible = false;
        child.add(wireframe);
      }
      meshesRef.current.push(child);
    });
    meshesRef.current.sort((a, b) => a.position.x - b.position.x);
    processedModelRef.current = model;
  }, [model]);
  const applyToMesh = _react.useCallback.call(void 0, 
    (mesh, config) => {
      const wireframe = mesh.getObjectByName(
        `${mesh.name}-wireframe`
      );
      const original = mesh.userData.originalMaterial;
      let newMaterials;
      switch (config.type) {
        case "textured":
          newMaterials = original;
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case "solid":
        case "wireframe":
          const isWireframe = config.type === "wireframe";
          if (Array.isArray(original)) {
            newMaterials = original.map((origMat) => {
              return synthesizeMaterial(origMat.clone(), isWireframe, config);
            });
          } else {
            newMaterials = synthesizeMaterial(original.clone(), isWireframe, config);
          }
          if (wireframe && isWireframe) {
            wireframe.material.color.set(
              _nullishCoalesce(config.lineColor, () => ( 0))
            );
          }
          break;
        case "custom":
          if (Array.isArray(original)) {
            newMaterials = original.map(
              (mat) => config.factory(mat)
            );
          } else {
            newMaterials = config.factory(original);
          }
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        default:
          return;
      }
      mesh.material = newMaterials;
    },
    []
  );
  const applyMaterial = _react.useCallback.call(void 0, 
    (config) => {
      if (!model || isTransitioning || meshesRef.current.length === 0) {
        return;
      }
      setOldName(_nullishCoalesce(activeName, () => ( "")));
      setNextName(config.name);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      setIsTransitioning(true);
      setPercentage(0);
      if (transitionDuration === 0) {
        meshesRef.current.forEach((m) => applyToMesh(m, config));
        setActiveName(config.name);
        setIsTransitioning(false);
        return;
      }
      const delay = transitionDuration / meshesRef.current.length;
      let completed = 0;
      meshesRef.current.forEach((mesh, i) => {
        const timeoutId = window.setTimeout(() => {
          applyToMesh(mesh, config);
          completed++;
          setPercentage(completed / meshesRef.current.length * 100);
          if (completed === meshesRef.current.length) {
            setActiveName(config.name);
            setIsTransitioning(false);
          }
        }, i * delay);
        timeoutsRef.current.push(timeoutId);
      });
    },
    [model, isTransitioning, activeName, transitionDuration, applyToMesh]
  );
  const items = _react.useMemo.call(void 0, 
    () => materials.map((config) => ({
      name: config.name,
      oldName,
      nextName,
      apply: () => applyMaterial(config),
      isActive: activeName === config.name,
      percentage
    })),
    [materials, oldName, nextName, activeName, percentage, applyMaterial]
  );
  _react.useEffect.call(void 0, () => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const defaultItem = items.find((i) => i.name === activeDefault) || items[0];
    if (defaultItem && meshesRef.current.length > 0) {
      defaultItem.apply();
    }
  }, [model, items, activeDefault, activeName]);
  _react.useEffect.call(void 0, () => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);
  if (!model) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items, isTransitioning) });
};
function synthesizeMaterial(cloned, isWireframe, config) {
  if ("color" in cloned && cloned.color instanceof _chunkEA3XQ4KJcjs.THREE.Color) {
    cloned.color.set(_nullishCoalesce(config.color, () => ( 8947848)));
  } else {
    cloned.color = new _chunkEA3XQ4KJcjs.THREE.Color(_nullishCoalesce(config.color, () => ( 8947848)));
  }
  if ("alphaTest" in cloned) {
    cloned.alphaTest = 0;
  }
  for (const key of TEXTURE_PROPS) {
    if (key in cloned) {
      cloned[key] = null;
    }
  }
  if (!isWireframe) {
    if ("metalness" in cloned) {
      cloned.metalness = _nullishCoalesce(config.metalness, () => ( cloned.metalness));
    }
    if ("roughness" in cloned) {
      cloned.roughness = _nullishCoalesce(config.roughness, () => ( cloned.roughness));
    }
  }
  if ("transmission" in cloned) {
    cloned.transmission = 0;
  }
  if ("thickness" in cloned) {
    cloned.thickness = 0;
  }
  if ("ior" in cloned) {
    cloned.ior = 1;
  }
  if (isWireframe) {
    cloned.transparent = true;
    cloned.opacity = 0.95;
  } else {
    cloned.transparent = false;
    cloned.opacity = 1;
  }
  cloned.needsUpdate = true;
  return cloned;
}



exports.MaterialController = MaterialController;
