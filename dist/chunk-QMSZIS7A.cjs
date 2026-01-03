"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkCUEKVN7Qcjs = require('./chunk-CUEKVN7Q.cjs');


var _chunkGICX4QCOcjs = require('./chunk-GICX4QCO.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/MaterialController.tsx






var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
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
      let newMat;
      const original = mesh.userData.originalMaterial;
      switch (config.type) {
        case "textured":
          newMat = original;
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        /*case 'solid':
          newMat = new THREE.MeshStandardMaterial({
            color: config.color ?? 0x888888,
            metalness: config.metalness ?? 0.5,
            roughness: config.roughness ?? 0.7,
            side: THREE.DoubleSide,
          });
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case 'wireframe':
          newMat = new THREE.MeshStandardMaterial({
            color: config.color ?? 0x888888,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide,
          });
          newMat = mesh.userData.originalMaterial.clone();
          (newMat as THREE.MeshStandardMaterial).color.set(config.color ?? 0x888888);
          (newMat as THREE.MeshStandardMaterial).transparent = true;
          (newMat as THREE.MeshStandardMaterial).opacity = 0.95;
          if (wireframe) {
            wireframe.visible = true;
            (wireframe.material as THREE.LineBasicMaterial).color.set(
              config.lineColor ?? 0x000000
            );
          }*/
        case "solid":
        case "wireframe":
          if (Array.isArray(original)) {
            newMat = original.map((origMat) => {
              const cloned = origMat.clone();
              cloned.color.set(_nullishCoalesce(config.color, () => ( 8947848)));
              if (cloned instanceof _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial && config.type === "solid") {
                cloned.metalness = _nullishCoalesce(config.metalness, () => ( 0.5));
                cloned.roughness = _nullishCoalesce(config.roughness, () => ( 0.7));
              }
              if (cloned instanceof _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial && config.type === "wireframe") {
                cloned.transparent = true;
                cloned.opacity = 0.95;
              }
              return cloned;
            });
          } else {
            newMat = original.clone();
            newMat.color.set(_nullishCoalesce(config.color, () => ( 8947848)));
            if (newMat instanceof _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial && config.type === "solid") {
              newMat.metalness = _nullishCoalesce(config.metalness, () => ( 0.5));
              newMat.roughness = _nullishCoalesce(config.roughness, () => ( 0.7));
            }
            if (newMat instanceof _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial && config.type === "wireframe") {
              newMat.transparent = true;
              newMat.opacity = 0.95;
            }
          }
          if (wireframe) {
            wireframe.visible = config.type === "wireframe";
            if (config.type === "wireframe") {
              wireframe.material.color.set(
                _nullishCoalesce(config.lineColor, () => ( 0))
              );
            }
          }
          break;
        case "custom":
          newMat = config.factory(mesh.userData.originalMaterial);
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        default:
          return;
      }
      mesh.material = newMat;
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



exports.MaterialController = MaterialController;
