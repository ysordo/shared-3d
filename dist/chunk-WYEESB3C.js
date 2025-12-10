import {
  createQuadWireframe
} from "./chunk-AWVHTM2E.js";
import {
  useActiveModel
} from "./chunk-UFGFSRHI.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/controls/MaterialController.tsx
import { useEffect, useState, useRef, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var MaterialController = ({
  materials,
  activeDefault = materials[0].name,
  transitionDuration = 0,
  children,
  className
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const meshes = useRef([]);
  useEffect(() => {
    if (!model) {
      return;
    }
    meshes.current = [];
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
      }
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = createQuadWireframe(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0,
          linewidth: 3,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1
        });
        const wireframe = new THREE.LineSegments(wireGeo, lineMat);
        wireframe.name = `${child.name}-wireframe`;
        wireframe.renderOrder = 999;
        wireframe.visible = false;
        child.add(wireframe);
      }
      meshes.current.push(child);
    });
  }, [model]);
  const applyMaterial = async (config) => {
    if (!model || isTransitioning) {
      return;
    }
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
        if (i === meshes.current.length - 1) {
          setActiveName(config.name);
          setIsTransitioning(false);
        }
      }, i * delayPerMesh);
    }
  };
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
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 8947848,
          metalness: config.metalness ?? 0,
          roughness: config.roughness ?? 0.9,
          side: THREE.DoubleSide,
          flatShading: false,
          dithering: true,
          precision: "highp",
          shadowSide: THREE.FrontSide,
          clipShadows: true
        });
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "wireframe":
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 8947848,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide,
          flatShading: false,
          dithering: true,
          precision: "highp",
          shadowSide: THREE.FrontSide,
          clipShadows: true
        });
        if (wireframe) {
          wireframe.visible = true;
          wireframe.material.color.set(
            config.lineColor ?? 0
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
  const items = useMemo(() => {
    return materials.map((config) => ({
      name: config.name,
      apply: () => applyMaterial(config),
      isActive: activeName === config.name
    }));
  }, [materials, activeName, applyMaterial]);
  useEffect(() => {
    if (items.length > 0 && !activeName) {
      items.find((n) => n.name === activeDefault)?.apply();
    }
  }, [activeDefault, items]);
  if (!model) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className, children: children(items) });
};

export {
  MaterialController
};
