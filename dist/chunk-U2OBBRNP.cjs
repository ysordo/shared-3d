"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkGICX4QCOcjs = require('./chunk-GICX4QCO.cjs');


var _chunkLHFRE7PQcjs = require('./chunk-LHFRE7PQ.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/controls/MaterialController.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var MaterialController = ({
  materials,
  activeDefault = materials[0].name,
  transitionDuration = 0,
  children,
  className
}) => {
  const model = _chunkLHFRE7PQcjs.useActiveModel.call(void 0, );
  const [activeName, setActiveName] = _react.useState.call(void 0, null);
  const [oldName, setOldName] = _react.useState.call(void 0, null);
  const [isTransitioning, setIsTransitioning] = _react.useState.call(void 0, false);
  const meshes = _react.useRef.call(void 0, []);
  const percentage = _react.useRef.call(void 0, 0);
  _react.useEffect.call(void 0, () => {
    if (!model) {
      return;
    }
    meshes.current = [];
    model.traverse((child) => {
      if (!(child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh)) {
        return;
      }
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
      }
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = _chunkGICX4QCOcjs.createQuadWireframe.call(void 0, child.geometry);
        const lineMat = new _chunkEA3XQ4KJcjs.THREE.LineBasicMaterial({
          color: 0,
          linewidth: 3,
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
      meshes.current.push(child);
    });
  }, [model]);
  const applyMaterial = _react.useCallback.call(void 0, async (config) => {
    if (!model || isTransitioning) {
      return;
    }
    setOldName(activeName);
    setIsTransitioning(transitionDuration > 0);
    if (transitionDuration === 0) {
      meshes.current.forEach((child) => applyMaterialToMesh(child, config));
      setActiveName(config.name);
      setIsTransitioning(false);
      return;
    }
    const delayPerMesh = transitionDuration / meshes.current.length;
    for (let i = 0; i < meshes.current.length; i++) {
      setTimeout(() => {
        applyMaterialToMesh(meshes.current[i], config);
        percentage.current = Number.parseFloat(((i / meshes.current.length - 1) / 100).toFixed(1));
        if (i === meshes.current.length - 1) {
          setActiveName(config.name);
          setIsTransitioning(false);
        }
      }, i * delayPerMesh);
    }
  }, []);
  const applyMaterialToMesh = (child, config) => {
    const wireframe = child.getObjectByName(
      `${child.name}-wireframe`
    );
    let newMat;
    switch (config.type) {
      case "textured":
        newMat = child.userData.originalMaterial;
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "solid":
        newMat = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
          color: _nullishCoalesce(config.color, () => ( 8947848)),
          metalness: _nullishCoalesce(config.metalness, () => ( 0)),
          roughness: _nullishCoalesce(config.roughness, () => ( 0.9)),
          side: _chunkEA3XQ4KJcjs.THREE.DoubleSide,
          flatShading: false,
          dithering: true,
          precision: "highp",
          shadowSide: _chunkEA3XQ4KJcjs.THREE.FrontSide,
          clipShadows: true
        });
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "wireframe":
        newMat = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
          color: _nullishCoalesce(config.color, () => ( 8947848)),
          transparent: true,
          opacity: 0.95,
          side: _chunkEA3XQ4KJcjs.THREE.DoubleSide,
          flatShading: false,
          dithering: true,
          precision: "highp",
          shadowSide: _chunkEA3XQ4KJcjs.THREE.FrontSide,
          clipShadows: true
        });
        if (wireframe) {
          wireframe.visible = true;
          wireframe.material.color.set(
            _nullishCoalesce(config.lineColor, () => ( 0))
          );
        }
        break;
      case "custom":
        newMat = config.factory(child.userData.originalMaterial);
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
    }
    child.material = newMat;
  };
  const items = _react.useMemo.call(void 0, () => {
    return materials.map((config) => ({
      name: config.name,
      oldName,
      apply: () => applyMaterial(config),
      isActive: activeName === config.name,
      percentage: percentage.current
    }));
  }, [percentage, materials, activeName, applyMaterial, oldName]);
  _react.useEffect.call(void 0, () => {
    if (items.length > 0 && !activeName) {
      _optionalChain([items, 'access', _ => _.find, 'call', _2 => _2((n) => n.name === activeDefault), 'optionalAccess', _3 => _3.apply, 'call', _4 => _4()]);
    }
  }, [activeDefault, items]);
  if (!model) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items) });
};



exports.MaterialController = MaterialController;
