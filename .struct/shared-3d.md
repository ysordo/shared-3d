# Estructura de: shared-3d#v1.0.5/
## Generated: 28/11/2025, 4:36:02 p.m.
---

```

📂shared-3d/
├── 📁public/
│   └── 📁draco/
│       ├── 📄draco_decoder.js
│       ├── 📄draco_decoder.wasm
│       └── 📄draco_wasm_wrapper.js
├── 📁src/
│   ├── 📁context/
│   │   ├── 📄CacheContext.tsx
│   │   ├── 📄index.ts
│   │   └── 📄SceneContext.tsx
│   ├── 📁core/
│   │   ├── 📁cache/
│   │   │   ├── 📁utils/
│   │   │   │   └── 📄env.ts
│   │   │   ├── 📄CacheValidator.ts
│   │   │   ├── 📄FileWatcher.ts
│   │   │   ├── 📄generateManifest.ts
│   │   │   ├── 📄index.ts
│   │   │   ├── 📄ObjectCache.ts
│   │   │   └── 📄types.ts
│   │   ├── 📁loaders/
│   │   │   ├── 📄GLTFLoader.ts
│   │   │   ├── 📄HDRILoader.ts
│   │   │   ├── 📄index.ts
│   │   │   └── 📄WebPHDRLoader.ts
│   │   ├── 📁orchestrator/
│   │   │   ├── 📁plugins/
│   │   │   │   ├── 📄AdvancedCameraCollisionPlugin.ts
│   │   │   │   ├── 📄AdvancedOrbitControlsPlugin.ts
│   │   │   │   ├── 📄AdvancedRaycasterPlugin.ts
│   │   │   │   ├── 📄AnnotationsPlugin.ts
│   │   │   │   ├── 📄AutoLODSystemPlugin.ts
│   │   │   │   ├── 📄HotspotPlugin.ts
│   │   │   │   ├── 📄index.ts
│   │   │   │   ├── 📄LODSystemPlugin.ts
│   │   │   │   ├── 📄OrbitControlsPlugin.ts
│   │   │   │   ├── 📄PostProcessingPlugin.ts
│   │   │   │   └── 📄RaycasterPlugin.ts
│   │   │   ├── 📄index.ts
│   │   │   ├── 📄SceneOrchestrator.ts
│   │   │   └── 📄types.ts
│   │   ├── 📁utils/
│   │   │   ├── 📄index.ts
│   │   │   └── 📄QuadWireframe.ts
│   │   └── 📄index.ts
│   ├── 📁hooks/
│   │   ├── 📄index.ts
│   │   ├── 📄useActiveModel.ts
│   │   ├── 📄useAnimation.ts
│   │   ├── 📄useCache.ts
│   │   ├── 📄useHDRI.ts
│   │   ├── 📄useModel.ts
│   │   ├── 📄useRaycaster.ts
│   │   └── 📄useScene.ts
│   ├── 📁lib/
│   │   ├── 📄index.ts
│   │   ├── 📄three.ts
│   │   └── 📄types.ts
│   ├── 📁react/
│   │   ├── 📁components/
│   │   │   ├── 📄AdvancedCameraCollision.tsx
│   │   │   ├── 📄AdvancedDragRaycaster.tsx
│   │   │   ├── 📄AdvancedOrbitControls.tsx
│   │   │   ├── 📄AdvancedRaycaster.tsx
│   │   │   ├── 📄AmbientLight.tsx
│   │   │   ├── 📄AnimationTimeline.tsx
│   │   │   ├── 📄Annotations.tsx
│   │   │   ├── 📄ARButton.tsx
│   │   │   ├── 📄AutoLODSystem.tsx
│   │   │   ├── 📄Canvas.tsx
│   │   │   ├── 📄DirectionalLight.tsx
│   │   │   ├── 📄DistanceDisplay.tsx
│   │   │   ├── 📄EnvironmentPreset.tsx
│   │   │   ├── 📄ErrorBoundary3D.tsx
│   │   │   ├── 📄GroundSurface.tsx
│   │   │   ├── 📄HDRI.tsx
│   │   │   ├── 📄Hotspot.tsx
│   │   │   ├── 📄index.ts
│   │   │   ├── 📄InstancedModel.tsx
│   │   │   ├── 📄LODSystem.tsx
│   │   │   ├── 📄Model.tsx
│   │   │   ├── 📄ModelPreload.tsx
│   │   │   ├── 📄OrbitControls.tsx
│   │   │   ├── 📄PointLight.tsx
│   │   │   ├── 📄PostProcessing.tsx
│   │   │   ├── 📄Raycaster.tsx
│   │   │   ├── 📄SpotLight.tsx
│   │   │   ├── 📄TheaterLighting.tsx
│   │   │   └── 📄VRButton.tsx
│   │   ├── 📁controls/
│   │   │   ├── 📄AnimationController.tsx
│   │   │   ├── 📄index.ts
│   │   │   ├── 📄LightingController.tsx
│   │   │   └── 📄MaterialController.tsx
│   │   ├── 📁primitives/
│   │   │   ├── 📄index.ts
│   │   │   └── 📄SceneObject.tsx
│   │   └── 📄index.ts
│   └── 📄index.ts
├── 📄.gitignore
├── 📄.npmrc
├── 📄eslint.config.js
├── 📄LICENSE
├── 📄package.json
├── 📄pnpm-lock.yaml
├── 📄README.md
├── 📄tsconfig.json
├── 📄tsup.config.js
└── 📄typedoc.json
```

