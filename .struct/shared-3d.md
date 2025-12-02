# Estructura de: shared-3d#v1.0.5/
## Generated: 2/12/2025, 12:58:47 p.m.
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
│   │   │   ├── 📁server/
│   │   │   │   ├── 📄generateManifest.ts
│   │   │   │   └── 📄index.server.ts
│   │   │   ├── 📁utils/
│   │   │   │   └── 📄env.ts
│   │   │   ├── 📄CacheValidator.ts
│   │   │   ├── 📄FileWatcher.ts
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
│   │   │   │   ├── 📄MeasurementToolPlugin.ts
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
│   │   │   ├── 📄Hotspots.tsx
│   │   │   ├── 📄index.ts
│   │   │   ├── 📄InstancedModel.tsx
│   │   │   ├── 📄LODSystem.tsx
│   │   │   ├── 📄MeasurementTool.tsx
│   │   │   ├── 📄Model.tsx
│   │   │   ├── 📄ModelPreload.tsx
│   │   │   ├── 📄OrbitControls.tsx
│   │   │   ├── 📄PointLight.tsx
│   │   │   ├── 📄PostProcessing.tsx
│   │   │   ├── 📄Raycaster.tsx
│   │   │   ├── 📄SpotLight.tsx
│   │   │   ├── 📄Suspense.tsx
│   │   │   ├── 📄SuspenseModel.tsx
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

---

```
📂dist/
├── 📁lib/
│   ├── 📄three.cjs
│   ├── 📄three.d.cts
│   ├── 📄three.d.ts
│   └── 📄three.js
├── 📁server/
│   ├── 📄index.cjs
│   └── 📄index.js
├── 📄chunk-EA3XQ4KJ.cjs
├── 📄chunk-OVHQQSEK.js
├── 📄index.cjs
├── 📄index.d.cts
├── 📄index.d.ts
└── 📄index.js
```

---

```
📂docs/
├── 📁classes/
│   ├── 📄AdvancedCameraCollisionPlugin.md
│   ├── 📄AdvancedOrbitControlsPlugin.md
│   ├── 📄AdvancedRaycasterPlugin.md
│   ├── 📄AnnotationsPlugin.md
│   ├── 📄AutoLODSystemPlugin.md
│   ├── 📄CacheValidator.md
│   ├── 📄ErrorBoundary3D.md
│   ├── 📄FileWatcher.md
│   ├── 📄GLTFLoader.md
│   ├── 📄HDRILoader.md
│   ├── 📄HotspotPlugin.md
│   ├── 📄LODSystemPlugin.md
│   ├── 📄MeasurementToolPlugin.md
│   ├── 📄ObjectCache.md
│   ├── 📄OrbitControlsPlugin.md
│   ├── 📄PostProcessingPlugin.md
│   ├── 📄RaycasterPlugin.md
│   ├── 📄SceneOrchestrator.md
│   └── 📄WebPHDRLoader.md
├── 📁functions/
│   ├── 📄CacheProvider.md
│   ├── 📄useActiveModel.md
│   ├── 📄useAnimation.md
│   ├── 📄useCache.md
│   ├── 📄useHDRI.md
│   ├── 📄useModel.md
│   ├── 📄useRaycaster.md
│   └── 📄useScene.md
├── 📁interfaces/
│   └── 📄Plugin.md
├── 📁type-aliases/
│   ├── 📄CacheEntry.md
│   ├── 📄CacheReport.md
│   ├── 📄ClickEvent.md
│   ├── 📄ColorRepresentation.md
│   ├── 📄CustomMaterialFactory.md
│   ├── 📄DeepPartial.md
│   ├── 📄GLTFLoaderEvents.md
│   ├── 📄GLTFLoaderOptions.md
│   ├── 📄HDRIEvents.md
│   ├── 📄HDRIProgress.md
│   ├── 📄HoverEvent.md
│   ├── 📄LightConfig.md
│   ├── 📄ManifestEntry.md
│   ├── 📄MaterialConfig.md
│   ├── 📄MeasurementEvent.md
│   ├── 📄ModelManifest.md
│   ├── 📄PluginContext.md
│   ├── 📄RaycasterEvent.md
│   ├── 📄SceneConfig.md
│   ├── 📄ValidationOptions.md
│   └── 📄Vector3Tuple.md
├── 📁variables/
│   ├── 📄AdvancedCameraCollision.md
│   ├── 📄AdvancedDragRaycaster.md
│   ├── 📄AdvancedOrbitControls.md
│   ├── 📄AdvancedRaycaster.md
│   ├── 📄AmbientLight.md
│   ├── 📄AnimationController.md
│   ├── 📄AnimationTimeline.md
│   ├── 📄Annotations.md
│   ├── 📄ARButton.md
│   ├── 📄AutoLODSystem.md
│   ├── 📄Canvas.md
│   ├── 📄DirectionalLight.md
│   ├── 📄DistanceDisplay.md
│   ├── 📄EnvironmentPreset.md
│   ├── 📄GroundSurface.md
│   ├── 📄HDRI.md
│   ├── 📄Hotspot.md
│   ├── 📄Hotspots.md
│   ├── 📄InstancedModel.md
│   ├── 📄LightingController.md
│   ├── 📄LODSystem.md
│   ├── 📄MaterialController.md
│   ├── 📄MeasurementTool.md
│   ├── 📄Model.md
│   ├── 📄ModelPreload.md
│   ├── 📄OrbitControls.md
│   ├── 📄PointLight.md
│   ├── 📄PostProcessing.md
│   ├── 📄Raycaster.md
│   ├── 📄SceneObject.md
│   ├── 📄SceneProvider.md
│   ├── 📄SpotLight.md
│   ├── 📄Suspense.md
│   ├── 📄SuspenseModel.md
│   ├── 📄TheaterLighting.md
│   ├── 📄THREE_VERSION.md
│   └── 📄VRButton.md
├── 📄.nojekyll
└── 📄README.md
```

