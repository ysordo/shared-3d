"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkGICX4QCOcjs = require('./chunk-GICX4QCO.cjs');


var _chunkQ7EPE3QCcjs = require('./chunk-Q7EPE3QC.cjs');


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
  const model = _chunkQ7EPE3QCcjs.useActiveModel.call(void 0, );
  const [activeName, setActiveName] = _react.useState.call(void 0, null);
  const [oldName, setOldName] = _react.useState.call(void 0, "");
  const [isTransitioning, setIsTransitioning] = _react.useState.call(void 0, false);
  const percentageRef = _react.useRef.call(void 0, 0);
  const rafRef = _react.useRef.call(void 0, null);
  const meshesRef = _react.useRef.call(void 0, []);
  const processedModelRef = _react.useRef.call(void 0, null);
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
    meshesRef.current.sort((a, b) => a.uuid.localeCompare(b.uuid));
    processedModelRef.current = model;
  }, [model]);
  const applyToMesh = _react.useCallback.call(void 0, 
    (mesh, config) => {
      const wireframe = mesh.getObjectByName(
        `${mesh.name}-wireframe`
      );
      let newMat;
      switch (config.type) {
        case "textured":
          newMat = mesh.userData.originalMaterial;
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case "solid":
          newMat = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
            color: _nullishCoalesce(config.color, () => ( 8947848)),
            metalness: _nullishCoalesce(config.metalness, () => ( 0.5)),
            roughness: _nullishCoalesce(config.roughness, () => ( 0.7)),
            side: _chunkEA3XQ4KJcjs.THREE.DoubleSide
          });
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case "wireframe":
          newMat = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
            color: _nullishCoalesce(config.color, () => ( 8947848)),
            transparent: true,
            opacity: 0.05,
            side: _chunkEA3XQ4KJcjs.THREE.DoubleSide
          });
          if (wireframe) {
            wireframe.visible = true;
            wireframe.material.color.set(
              _nullishCoalesce(config.lineColor, () => ( 0))
            );
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
      if (meshesRef.current.length === 0) {
        return;
      }
      setOldName(_nullishCoalesce(activeName, () => ( "")));
      setIsTransitioning(true);
      percentageRef.current = 0;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (transitionDuration === 0) {
        meshesRef.current.forEach((m) => applyToMesh(m, config));
        setActiveName(config.name);
        setIsTransitioning(false);
        return;
      }
      const start = performance.now();
      const duration = transitionDuration;
      const animate = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / duration, 1);
        const targetCount = Math.floor(meshesRef.current.length * t);
        for (let i = percentageRef.current; i < targetCount; i++) {
          const mesh = meshesRef.current[i];
          if (mesh) {
            applyToMesh(mesh, config);
          }
        }
        percentageRef.current = targetCount / meshesRef.current.length * 100;
        if (t < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setActiveName(config.name);
          setIsTransitioning(false);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    },
    [model, isTransitioning, transitionDuration, applyToMesh]
  );
  const items = _react.useMemo.call(void 0, 
    () => materials.map((config) => ({
      name: config.name,
      oldName,
      apply: () => applyMaterial(config),
      isActive: activeName === config.name,
      percentage: percentageRef.current
    })),
    [materials, oldName, activeName, applyMaterial]
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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items) });
};



exports.MaterialController = MaterialController;
