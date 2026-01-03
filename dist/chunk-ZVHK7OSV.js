import {
  useActiveModel
} from "./chunk-V55S5YL6.js";
import {
  createQuadWireframe
} from "./chunk-AWVHTM2E.js";
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
  const model = useActiveModel();
  const [activeName, setActiveName] = useState(null);
  const [oldName, setOldName] = useState("");
  const [nextName, setNextName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const meshesRef = useRef([]);
  const processedModelRef = useRef(null);
  const timeoutsRef = useRef([]);
  useEffect(() => {
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
    processedModelRef.current = model;
  }, [model]);
  const applyToMesh = useCallback(
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
            newMaterials = synthesizeMaterial(
              original.clone(),
              isWireframe,
              config
            );
          }
          if (wireframe) {
            wireframe.visible = isWireframe;
            if (isWireframe) {
              wireframe.material.color.set(
                config.lineColor ?? 0
              );
            }
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
  const applyMaterial = useCallback(
    (config) => {
      if (!model || isTransitioning || meshesRef.current.length === 0) {
        return;
      }
      setOldName(activeName ?? "");
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
  const items = useMemo(
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
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);
  if (!model) {
    return /* @__PURE__ */ jsx("div", { className, children: children([], false) });
  }
  return /* @__PURE__ */ jsx("div", { className, children: children(items, isTransitioning) });
};
function synthesizeMaterial(cloned, isWireframe, config) {
  if ("color" in cloned && cloned.color instanceof THREE.Color) {
    cloned.color.set(config.color ?? 8947848);
  } else {
    cloned.color = new THREE.Color(config.color ?? 8947848);
  }
  if ("alphaTest" in cloned) {
    cloned.alphaTest = 0;
  }
  for (const key of TEXTURE_PROPS) {
    if (key in cloned) {
      cloned[key] = null;
    }
  }
  if ("metalness" in cloned) {
    cloned.metalness = config.metalness ?? cloned.metalness;
  }
  if ("roughness" in cloned) {
    cloned.roughness = config.roughness ?? cloned.roughness;
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

export {
  MaterialController
};
