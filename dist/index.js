import {
  SuspenseModel
} from "./chunk-6ELTNRD5.js";
import {
  TheaterLighting
} from "./chunk-BKZZWXN7.js";
import {
  VRButton
} from "./chunk-OASOCNNE.js";
import {
  Model
} from "./chunk-M3WZHTGS.js";
import {
  ModelPreload
} from "./chunk-RBA35FKK.js";
import {
  OrbitControls as OrbitControls2
} from "./chunk-HB2MYA43.js";
import {
  PointLight
} from "./chunk-7JTF6DFK.js";
import {
  PostProcessing
} from "./chunk-ODHFJDWB.js";
import {
  Raycaster
} from "./chunk-4E2NMKOL.js";
import {
  SpotLight
} from "./chunk-GDQHY3XH.js";
import {
  Suspense
} from "./chunk-RUDNMJTZ.js";
import {
  ErrorBoundary3D
} from "./chunk-POOGUPPI.js";
import {
  GroundSurface
} from "./chunk-R55G7KGT.js";
import {
  HDRI
} from "./chunk-Q7FTH3IX.js";
import {
  Hotspot
} from "./chunk-R65OL446.js";
import {
  Hotspots
} from "./chunk-K74YUHIW.js";
import {
  InstancedModel
} from "./chunk-PSPUBVLG.js";
import {
  LODSystem
} from "./chunk-FOTZCW7M.js";
import {
  MeasurementTool
} from "./chunk-TGXXEJSX.js";
import {
  AmbientLight
} from "./chunk-ABM33I7Q.js";
import {
  AnimationTimeline
} from "./chunk-6FCATWGW.js";
import {
  Annotations
} from "./chunk-IQZTNJXP.js";
import {
  AutoLODSystem
} from "./chunk-AOP7YC3S.js";
import {
  Canvas
} from "./chunk-6GG4QE2E.js";
import {
  DirectionalLight
} from "./chunk-REQUZTZ4.js";
import {
  DistanceDisplay
} from "./chunk-VNBQSAVJ.js";
import {
  EnvironmentPreset
} from "./chunk-CHORX2B2.js";
import "./chunk-52BWUKU3.js";
import {
  createQuadWireframe
} from "./chunk-AWVHTM2E.js";
import {
  ARButton
} from "./chunk-SGTRREOB.js";
import {
  AdvancedCameraCollision
} from "./chunk-F7F54MU6.js";
import {
  AdvancedDragRaycaster
} from "./chunk-DLGDBYNQ.js";
import {
  AdvancedOrbitControls
} from "./chunk-XW2RYNM3.js";
import {
  AdvancedRaycaster
} from "./chunk-HU5ILTIE.js";
import "./chunk-PFUSRKMN.js";
import "./chunk-E64RDZHI.js";
import "./chunk-G5YWPRA4.js";
import "./chunk-EC4WICT5.js";
import "./chunk-ZC66QDE5.js";
import "./chunk-Q47SPRY7.js";
import {
  useHDRI
} from "./chunk-CPMHERKH.js";
import {
  useModel
} from "./chunk-P2AJYPTQ.js";
import {
  useRaycaster
} from "./chunk-4UVCRO2U.js";
import "./chunk-DCRMKZQR.js";
import {
  RaycasterPlugin
} from "./chunk-FBPG64NM.js";
import {
  OrbitControlsPlugin
} from "./chunk-R4RSFB4I.js";
import {
  PostProcessingPlugin
} from "./chunk-SRDOYMT5.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  LODSystemPlugin
} from "./chunk-HVXJUMVE.js";
import {
  MeasurementToolPlugin
} from "./chunk-PRNY2PGZ.js";
import {
  AnnotationsPlugin
} from "./chunk-CPKJTF7R.js";
import {
  AutoLODSystemPlugin
} from "./chunk-UHUPI6C6.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-3EGJYHIY.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-VTSNXELB.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-JQEF7TLI.js";
import {
  useAnimation
} from "./chunk-RMDAOZAB.js";
import {
  useActiveModel
} from "./chunk-IWWTL653.js";
import {
  useScene
} from "./chunk-OVWVQSTO.js";
import {
  SceneProvider
} from "./chunk-MZEYSNNV.js";
import {
  SceneOrchestrator
} from "./chunk-53O3DZBZ.js";
import {
  GLTFLoader as GLTFLoader2
} from "./chunk-JWY4ZHHB.js";
import {
  HDRILoader
} from "./chunk-7NTLIQ5L.js";
import {
  WebPHDRLoader
} from "./chunk-J3SAIRP2.js";
import {
  useCache
} from "./chunk-63VW2TWG.js";
import {
  CacheProvider
} from "./chunk-RSLPNPEF.js";
import {
  CacheValidator
} from "./chunk-ZRBGFD3Z.js";
import {
  FileWatcher
} from "./chunk-777TCJKN.js";
import "./chunk-SRUKCELR.js";
import {
  ObjectCache
} from "./chunk-MAROSTDG.js";
import {
  DRACOLoader,
  EXRLoader,
  EffectComposer,
  GLTFLoader,
  OrbitControls,
  RGBELoader,
  RenderPass,
  THREE,
  THREE_VERSION,
  UnrealBloomPass
} from "./chunk-OVHQQSEK.js";

// src/react/controls/AnimationController.tsx
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var AnimationController = ({
  children,
  className
}) => {
  const model = useActiveModel();
  const [clips, setClips] = useState([]);
  const [mixer, setMixer] = useState(
    () => new THREE.AnimationMixer(null)
  );
  const [actions, setActions] = useState(
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = useState(/* @__PURE__ */ new Set());
  const [reversed, setReversed] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    if (!model) {
      setClips([]);
      mixer.stopAllAction();
      return;
    }
    if (model.animations && model.animations.length > 0) {
      setClips(model.animations);
      setMixer(new THREE.AnimationMixer(model));
      mixer.setTime(0);
      const newActions = /* @__PURE__ */ new Map();
      model.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.enabled = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.reset();
        newActions.set(clip.name, action);
      });
      setActions(newActions);
    }
    const clock = new THREE.Clock();
    const animate = () => {
      mixer.update(clock.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      mixer.stopAllAction();
    };
  }, [model]);
  const playForward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });
    action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.2).play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };
  const playBackward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });
    action.reset().setEffectiveTimeScale(-1).setEffectiveWeight(1).fadeIn(0.2).play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => new Set(prev).add(name));
  };
  const toggle = (name) => {
    if (reversed.has(name)) {
      playForward(name);
    } else {
      playBackward(name);
    }
  };
  const animationList = clips.map((clip) => ({
    name: clip.name || `Animaci\xF3n ${clip.uuid.slice(0, 4)}`,
    playForward: () => playForward(clip.name),
    playBackward: () => playBackward(clip.name),
    toggle: () => toggle(clip.name),
    isPlaying: playing.has(clip.name),
    isReversed: reversed.has(clip.name)
  }));
  if (animationList.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className, children: children(animationList) });
};

// src/react/controls/LightingController.tsx
import React2, { useState as useState2 } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var LightingController = ({
  className
}) => {
  const { scene } = useScene();
  const [intensity, setIntensity] = useState2(1);
  const updateLights = (value) => {
    setIntensity(value);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.intensity = value * (obj.userData.baseIntensity || 1);
      }
    });
  };
  React2.useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.userData.baseIntensity = obj.intensity;
      }
    });
  }, [scene]);
  return /* @__PURE__ */ jsxs("div", { className: `bg-black/80 text-white p-4 rounded-lg ${className || ""}`, children: [
    /* @__PURE__ */ jsx2("h3", { className: "text-lg font-bold mb-3", children: "Iluminaci\xF3n Global" }),
    /* @__PURE__ */ jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
        "Intensidad: ",
        intensity.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx2(
        "input",
        {
          type: "range",
          min: "0",
          max: "3",
          step: "0.01",
          value: intensity,
          onChange: (e) => updateLights(parseFloat(e.target.value)),
          className: "w-full mt-2"
        }
      )
    ] })
  ] });
};

// src/react/controls/MaterialController.tsx
import { useEffect as useEffect2, useState as useState3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var MaterialController = ({
  materials,
  transitionDuration = 0,
  children,
  className
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState3(null);
  const [isTransitioning, setIsTransitioning] = useState3(false);
  useEffect2(() => {
    if (!model) {
      return;
    }
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
    });
  }, [model]);
  const applyMaterial = async (config) => {
    if (!model || isTransitioning) {
      return;
    }
    setIsTransitioning(transitionDuration > 0);
    const meshes = [];
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });
    if (transitionDuration === 0) {
      meshes.forEach((child) => applyMaterialToMesh(child, config));
      setActiveName(config.name);
      setIsTransitioning(false);
      return;
    }
    const delayPerMesh = transitionDuration / meshes.length;
    for (let i = 0; i < meshes.length; i++) {
      setTimeout(() => {
        applyMaterialToMesh(meshes[i], config);
        if (i === meshes.length - 1) {
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
          roughness: config.roughness ?? 0.9
        });
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "wireframe":
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 8947848,
          metalness: config.metalness ?? 0,
          roughness: config.roughness ?? 0.9,
          transparent: true,
          opacity: 0.95
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
  const items = materials.map((config) => ({
    name: config.name,
    apply: () => applyMaterial(config),
    isActive: activeName === config.name
  }));
  useEffect2(() => {
    if (items.length > 0 && !activeName) {
      items[0]?.apply?.();
    }
  }, [items]);
  if (!model || items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx3("div", { className, children: children(items) });
};

// src/react/primitives/SceneObject.tsx
import { useEffect as useEffect3 } from "react";
var SceneObject = ({
  object,
  parent = "scene",
  name,
  position,
  rotation,
  scale = [1, 1, 1],
  visible = true,
  castShadow = false,
  receiveShadow = false
}) => {
  const orchestrator = useScene();
  useEffect3(() => {
    if (name) {
      object.name = name;
    }
    object.visible = visible;
    object.castShadow = castShadow;
    object.receiveShadow = receiveShadow;
    if (position) {
      object.position.set(...position);
    }
    if (rotation) {
      object.rotation.set(...rotation);
    }
    if (scale) {
      object.scale.set(...scale);
    }
    let targetParent = null;
    if (parent === "scene") {
      targetParent = orchestrator.scene;
    } else if (parent === "model") {
      targetParent = orchestrator.getActiveModel();
    } else if (typeof parent === "string") {
      targetParent = orchestrator.scene.getObjectByName(parent) || null;
    } else if (parent instanceof THREE.Object3D) {
      targetParent = parent;
    }
    if (!targetParent) {
      console.warn("[SceneObject] Padre no encontrado:", parent);
      return;
    }
    targetParent.add(object);
    return () => {
      if (object.parent) {
        object.parent.remove(object);
      }
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };
  }, [
    object,
    parent,
    name,
    position,
    rotation,
    scale,
    visible,
    castShadow,
    receiveShadow
  ]);
  return null;
};
export {
  ARButton,
  AdvancedCameraCollision,
  AdvancedCameraCollisionPlugin,
  AdvancedDragRaycaster,
  AdvancedOrbitControls,
  AdvancedOrbitControlsPlugin,
  AdvancedRaycaster,
  AdvancedRaycasterPlugin,
  AmbientLight,
  AnimationController,
  AnimationTimeline,
  Annotations,
  AnnotationsPlugin,
  AutoLODSystem,
  AutoLODSystemPlugin,
  CacheProvider,
  CacheValidator,
  Canvas,
  DirectionalLight,
  DistanceDisplay,
  EnvironmentPreset,
  ErrorBoundary3D,
  FileWatcher,
  GLTFLoader2 as GLTFLoader,
  GroundSurface,
  HDRI,
  HDRILoader,
  Hotspot,
  HotspotPlugin,
  Hotspots,
  InstancedModel,
  LODSystem,
  LODSystemPlugin,
  LightingController,
  MaterialController,
  MeasurementTool,
  MeasurementToolPlugin,
  Model,
  ModelPreload,
  ObjectCache,
  OrbitControls2 as OrbitControls,
  OrbitControlsPlugin,
  PointLight,
  PostProcessing,
  PostProcessingPlugin,
  Raycaster,
  RaycasterPlugin,
  SceneObject,
  SceneOrchestrator,
  SceneProvider,
  SpotLight,
  Suspense,
  SuspenseModel,
  THREE,
  THREE_VERSION,
  TheaterLighting,
  DRACOLoader as ThreeDRACOLoader,
  EXRLoader as ThreeEXRLoader,
  EffectComposer as ThreeEffectComposer,
  GLTFLoader as ThreeGLTFLoader,
  OrbitControls as ThreeOrbitControls,
  RGBELoader as ThreeRGBELoader,
  RenderPass as ThreeRenderPass,
  UnrealBloomPass as ThreeUnrealBloomPass,
  VRButton,
  WebPHDRLoader,
  useActiveModel,
  useAnimation,
  useCache,
  useHDRI,
  useModel,
  useRaycaster,
  useScene
};
