import {
  createQuadWireframe
} from "./chunk-AWVHTM2E.js";
import {
  useActiveModel
} from "./chunk-JY7NWOQT.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/controls/MaterialController.tsx
import {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var MaterialController = ({
  materials,
  activeDefault,
  transitionDuration = 300,
  children,
  className
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState(null);
  const [oldName, setOldName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const percentageRef = useRef(0);
  const rafRef = useRef(null);
  const meshesRef = useRef([]);
  useEffect(() => {
    if (!model) {
      meshesRef.current = [];
      return;
    }
    meshesRef.current = [];
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material.clone();
      }
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = createQuadWireframe(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0,
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
      meshesRef.current.push(child);
    });
    meshesRef.current.sort((a, b) => a.uuid.localeCompare(b.uuid));
  }, [model]);
  const applyToMesh = useCallback(
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
          newMat = new THREE.MeshStandardMaterial({
            color: config.color ?? 8947848,
            metalness: config.metalness ?? 0.5,
            roughness: config.roughness ?? 0.7,
            side: THREE.DoubleSide
          });
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case "wireframe":
          newMat = new THREE.MeshStandardMaterial({
            color: config.color ?? 8947848,
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide
          });
          if (wireframe) {
            wireframe.visible = true;
            wireframe.material.color.set(
              config.lineColor ?? 0
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
  const applyMaterial = useCallback(
    (config) => {
      if (!model || isTransitioning || meshesRef.current.length === 0) {
        return;
      }
      if (meshesRef.current.length === 0) {
        return;
      }
      setOldName(activeName ?? "");
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
  const items = useMemo(
    () => materials.map((config) => ({
      name: config.name,
      oldName,
      apply: () => applyMaterial(config),
      isActive: activeName === config.name,
      percentage: percentageRef.current
    })),
    [materials, oldName, activeName, applyMaterial]
  );
  useEffect(() => {
    if (!model || activeName || items.length === 0) {
      return;
    }
    const defaultItem = items.find((i) => i.name === activeDefault) || items[0];
    if (defaultItem && meshesRef.current.length > 0) {
      defaultItem.apply();
    }
  }, [model, items, activeDefault, activeName]);
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className, children: children(items) });
};

export {
  MaterialController
};
