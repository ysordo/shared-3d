# Estructura de: shared-3d#v1.0.5/
## Generated: 4/12/2025, 1:28:35 p.m.
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
├── 📁context/
│   ├── 📄CacheContext.cjs
│   ├── 📄CacheContext.d.cts
│   ├── 📄CacheContext.d.ts
│   ├── 📄CacheContext.js
│   ├── 📄index.cjs
│   ├── 📄index.d.cts
│   ├── 📄index.d.ts
│   ├── 📄index.js
│   ├── 📄SceneContext.cjs
│   ├── 📄SceneContext.d.cts
│   ├── 📄SceneContext.d.ts
│   └── 📄SceneContext.js
├── 📁core/
│   ├── 📁cache/
│   │   ├── 📁server/
│   │   │   ├── 📄generateManifest.cjs
│   │   │   ├── 📄generateManifest.d.cts
│   │   │   ├── 📄generateManifest.d.ts
│   │   │   ├── 📄generateManifest.js
│   │   │   ├── 📄index.server.cjs
│   │   │   ├── 📄index.server.d.cts
│   │   │   ├── 📄index.server.d.ts
│   │   │   └── 📄index.server.js
│   │   ├── 📁utils/
│   │   │   ├── 📄env.cjs
│   │   │   ├── 📄env.d.cts
│   │   │   ├── 📄env.d.ts
│   │   │   └── 📄env.js
│   │   ├── 📄CacheValidator.cjs
│   │   ├── 📄CacheValidator.d.cts
│   │   ├── 📄CacheValidator.d.ts
│   │   ├── 📄CacheValidator.js
│   │   ├── 📄FileWatcher.cjs
│   │   ├── 📄FileWatcher.d.cts
│   │   ├── 📄FileWatcher.d.ts
│   │   ├── 📄FileWatcher.js
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄ObjectCache.cjs
│   │   ├── 📄ObjectCache.d.cts
│   │   ├── 📄ObjectCache.d.ts
│   │   ├── 📄ObjectCache.js
│   │   ├── 📄types.cjs
│   │   ├── 📄types.d.cts
│   │   ├── 📄types.d.ts
│   │   └── 📄types.js
│   ├── 📁loaders/
│   │   ├── 📄GLTFLoader.cjs
│   │   ├── 📄GLTFLoader.d.cts
│   │   ├── 📄GLTFLoader.d.ts
│   │   ├── 📄GLTFLoader.js
│   │   ├── 📄HDRILoader.cjs
│   │   ├── 📄HDRILoader.d.cts
│   │   ├── 📄HDRILoader.d.ts
│   │   ├── 📄HDRILoader.js
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄WebPHDRLoader.cjs
│   │   ├── 📄WebPHDRLoader.d.cts
│   │   ├── 📄WebPHDRLoader.d.ts
│   │   └── 📄WebPHDRLoader.js
│   ├── 📁orchestrator/
│   │   ├── 📁plugins/
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.cjs
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.d.cts
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.d.ts
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.js
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.cjs
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.d.cts
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.d.ts
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.js
│   │   │   ├── 📄AdvancedRaycasterPlugin.cjs
│   │   │   ├── 📄AdvancedRaycasterPlugin.d.cts
│   │   │   ├── 📄AdvancedRaycasterPlugin.d.ts
│   │   │   ├── 📄AdvancedRaycasterPlugin.js
│   │   │   ├── 📄AnnotationsPlugin.cjs
│   │   │   ├── 📄AnnotationsPlugin.d.cts
│   │   │   ├── 📄AnnotationsPlugin.d.ts
│   │   │   ├── 📄AnnotationsPlugin.js
│   │   │   ├── 📄AutoLODSystemPlugin.cjs
│   │   │   ├── 📄AutoLODSystemPlugin.d.cts
│   │   │   ├── 📄AutoLODSystemPlugin.d.ts
│   │   │   ├── 📄AutoLODSystemPlugin.js
│   │   │   ├── 📄HotspotPlugin.cjs
│   │   │   ├── 📄HotspotPlugin.d.cts
│   │   │   ├── 📄HotspotPlugin.d.ts
│   │   │   ├── 📄HotspotPlugin.js
│   │   │   ├── 📄index.cjs
│   │   │   ├── 📄index.d.cts
│   │   │   ├── 📄index.d.ts
│   │   │   ├── 📄index.js
│   │   │   ├── 📄LODSystemPlugin.cjs
│   │   │   ├── 📄LODSystemPlugin.d.cts
│   │   │   ├── 📄LODSystemPlugin.d.ts
│   │   │   ├── 📄LODSystemPlugin.js
│   │   │   ├── 📄MeasurementToolPlugin.cjs
│   │   │   ├── 📄MeasurementToolPlugin.d.cts
│   │   │   ├── 📄MeasurementToolPlugin.d.ts
│   │   │   ├── 📄MeasurementToolPlugin.js
│   │   │   ├── 📄OrbitControlsPlugin.cjs
│   │   │   ├── 📄OrbitControlsPlugin.d.cts
│   │   │   ├── 📄OrbitControlsPlugin.d.ts
│   │   │   ├── 📄OrbitControlsPlugin.js
│   │   │   ├── 📄PostProcessingPlugin.cjs
│   │   │   ├── 📄PostProcessingPlugin.d.cts
│   │   │   ├── 📄PostProcessingPlugin.d.ts
│   │   │   ├── 📄PostProcessingPlugin.js
│   │   │   ├── 📄RaycasterPlugin.cjs
│   │   │   ├── 📄RaycasterPlugin.d.cts
│   │   │   ├── 📄RaycasterPlugin.d.ts
│   │   │   └── 📄RaycasterPlugin.js
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄SceneOrchestrator.cjs
│   │   ├── 📄SceneOrchestrator.d.cts
│   │   ├── 📄SceneOrchestrator.d.ts
│   │   ├── 📄SceneOrchestrator.js
│   │   ├── 📄types.cjs
│   │   ├── 📄types.d.cts
│   │   ├── 📄types.d.ts
│   │   └── 📄types.js
│   ├── 📁utils/
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄QuadWireframe.cjs
│   │   ├── 📄QuadWireframe.d.cts
│   │   ├── 📄QuadWireframe.d.ts
│   │   └── 📄QuadWireframe.js
│   ├── 📄index.cjs
│   ├── 📄index.d.cts
│   ├── 📄index.d.ts
│   └── 📄index.js
├── 📁hooks/
│   ├── 📄index.cjs
│   ├── 📄index.d.cts
│   ├── 📄index.d.ts
│   ├── 📄index.js
│   ├── 📄useActiveModel.cjs
│   ├── 📄useActiveModel.d.cts
│   ├── 📄useActiveModel.d.ts
│   ├── 📄useActiveModel.js
│   ├── 📄useAnimation.cjs
│   ├── 📄useAnimation.d.cts
│   ├── 📄useAnimation.d.ts
│   ├── 📄useAnimation.js
│   ├── 📄useCache.cjs
│   ├── 📄useCache.d.cts
│   ├── 📄useCache.d.ts
│   ├── 📄useCache.js
│   ├── 📄useHDRI.cjs
│   ├── 📄useHDRI.d.cts
│   ├── 📄useHDRI.d.ts
│   ├── 📄useHDRI.js
│   ├── 📄useModel.cjs
│   ├── 📄useModel.d.cts
│   ├── 📄useModel.d.ts
│   ├── 📄useModel.js
│   ├── 📄useRaycaster.cjs
│   ├── 📄useRaycaster.d.cts
│   ├── 📄useRaycaster.d.ts
│   ├── 📄useRaycaster.js
│   ├── 📄useScene.cjs
│   ├── 📄useScene.d.cts
│   ├── 📄useScene.d.ts
│   └── 📄useScene.js
├── 📁lib/
│   ├── 📄index.cjs
│   ├── 📄index.d.cts
│   ├── 📄index.d.ts
│   ├── 📄index.js
│   ├── 📄three.cjs
│   ├── 📄three.d.cts
│   ├── 📄three.d.ts
│   ├── 📄three.js
│   ├── 📄types.cjs
│   ├── 📄types.d.cts
│   ├── 📄types.d.ts
│   └── 📄types.js
├── 📁react/
│   ├── 📁components/
│   │   ├── 📄AdvancedCameraCollision.cjs
│   │   ├── 📄AdvancedCameraCollision.d.cts
│   │   ├── 📄AdvancedCameraCollision.d.ts
│   │   ├── 📄AdvancedCameraCollision.js
│   │   ├── 📄AdvancedDragRaycaster.cjs
│   │   ├── 📄AdvancedDragRaycaster.d.cts
│   │   ├── 📄AdvancedDragRaycaster.d.ts
│   │   ├── 📄AdvancedDragRaycaster.js
│   │   ├── 📄AdvancedOrbitControls.cjs
│   │   ├── 📄AdvancedOrbitControls.d.cts
│   │   ├── 📄AdvancedOrbitControls.d.ts
│   │   ├── 📄AdvancedOrbitControls.js
│   │   ├── 📄AdvancedRaycaster.cjs
│   │   ├── 📄AdvancedRaycaster.d.cts
│   │   ├── 📄AdvancedRaycaster.d.ts
│   │   ├── 📄AdvancedRaycaster.js
│   │   ├── 📄AmbientLight.cjs
│   │   ├── 📄AmbientLight.d.cts
│   │   ├── 📄AmbientLight.d.ts
│   │   ├── 📄AmbientLight.js
│   │   ├── 📄AnimationTimeline.cjs
│   │   ├── 📄AnimationTimeline.d.cts
│   │   ├── 📄AnimationTimeline.d.ts
│   │   ├── 📄AnimationTimeline.js
│   │   ├── 📄Annotations.cjs
│   │   ├── 📄Annotations.d.cts
│   │   ├── 📄Annotations.d.ts
│   │   ├── 📄Annotations.js
│   │   ├── 📄ARButton.cjs
│   │   ├── 📄ARButton.d.cts
│   │   ├── 📄ARButton.d.ts
│   │   ├── 📄ARButton.js
│   │   ├── 📄AutoLODSystem.cjs
│   │   ├── 📄AutoLODSystem.d.cts
│   │   ├── 📄AutoLODSystem.d.ts
│   │   ├── 📄AutoLODSystem.js
│   │   ├── 📄Canvas.cjs
│   │   ├── 📄Canvas.d.cts
│   │   ├── 📄Canvas.d.ts
│   │   ├── 📄Canvas.js
│   │   ├── 📄DirectionalLight.cjs
│   │   ├── 📄DirectionalLight.d.cts
│   │   ├── 📄DirectionalLight.d.ts
│   │   ├── 📄DirectionalLight.js
│   │   ├── 📄DistanceDisplay.cjs
│   │   ├── 📄DistanceDisplay.d.cts
│   │   ├── 📄DistanceDisplay.d.ts
│   │   ├── 📄DistanceDisplay.js
│   │   ├── 📄EnvironmentPreset.cjs
│   │   ├── 📄EnvironmentPreset.d.cts
│   │   ├── 📄EnvironmentPreset.d.ts
│   │   ├── 📄EnvironmentPreset.js
│   │   ├── 📄ErrorBoundary3D.cjs
│   │   ├── 📄ErrorBoundary3D.d.cts
│   │   ├── 📄ErrorBoundary3D.d.ts
│   │   ├── 📄ErrorBoundary3D.js
│   │   ├── 📄GroundSurface.cjs
│   │   ├── 📄GroundSurface.d.cts
│   │   ├── 📄GroundSurface.d.ts
│   │   ├── 📄GroundSurface.js
│   │   ├── 📄HDRI.cjs
│   │   ├── 📄HDRI.d.cts
│   │   ├── 📄HDRI.d.ts
│   │   ├── 📄HDRI.js
│   │   ├── 📄Hotspot.cjs
│   │   ├── 📄Hotspot.d.cts
│   │   ├── 📄Hotspot.d.ts
│   │   ├── 📄Hotspot.js
│   │   ├── 📄Hotspots.cjs
│   │   ├── 📄Hotspots.d.cts
│   │   ├── 📄Hotspots.d.ts
│   │   ├── 📄Hotspots.js
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄InstancedModel.cjs
│   │   ├── 📄InstancedModel.d.cts
│   │   ├── 📄InstancedModel.d.ts
│   │   ├── 📄InstancedModel.js
│   │   ├── 📄LODSystem.cjs
│   │   ├── 📄LODSystem.d.cts
│   │   ├── 📄LODSystem.d.ts
│   │   ├── 📄LODSystem.js
│   │   ├── 📄MeasurementTool.cjs
│   │   ├── 📄MeasurementTool.d.cts
│   │   ├── 📄MeasurementTool.d.ts
│   │   ├── 📄MeasurementTool.js
│   │   ├── 📄Model.cjs
│   │   ├── 📄Model.d.cts
│   │   ├── 📄Model.d.ts
│   │   ├── 📄Model.js
│   │   ├── 📄ModelPreload.cjs
│   │   ├── 📄ModelPreload.d.cts
│   │   ├── 📄ModelPreload.d.ts
│   │   ├── 📄ModelPreload.js
│   │   ├── 📄OrbitControls.cjs
│   │   ├── 📄OrbitControls.d.cts
│   │   ├── 📄OrbitControls.d.ts
│   │   ├── 📄OrbitControls.js
│   │   ├── 📄PointLight.cjs
│   │   ├── 📄PointLight.d.cts
│   │   ├── 📄PointLight.d.ts
│   │   ├── 📄PointLight.js
│   │   ├── 📄PostProcessing.cjs
│   │   ├── 📄PostProcessing.d.cts
│   │   ├── 📄PostProcessing.d.ts
│   │   ├── 📄PostProcessing.js
│   │   ├── 📄Raycaster.cjs
│   │   ├── 📄Raycaster.d.cts
│   │   ├── 📄Raycaster.d.ts
│   │   ├── 📄Raycaster.js
│   │   ├── 📄SpotLight.cjs
│   │   ├── 📄SpotLight.d.cts
│   │   ├── 📄SpotLight.d.ts
│   │   ├── 📄SpotLight.js
│   │   ├── 📄Suspense.cjs
│   │   ├── 📄Suspense.d.cts
│   │   ├── 📄Suspense.d.ts
│   │   ├── 📄Suspense.js
│   │   ├── 📄SuspenseModel.cjs
│   │   ├── 📄SuspenseModel.d.cts
│   │   ├── 📄SuspenseModel.d.ts
│   │   ├── 📄SuspenseModel.js
│   │   ├── 📄TheaterLighting.cjs
│   │   ├── 📄TheaterLighting.d.cts
│   │   ├── 📄TheaterLighting.d.ts
│   │   ├── 📄TheaterLighting.js
│   │   ├── 📄VRButton.cjs
│   │   ├── 📄VRButton.d.cts
│   │   ├── 📄VRButton.d.ts
│   │   └── 📄VRButton.js
│   ├── 📁controls/
│   │   ├── 📄AnimationController.cjs
│   │   ├── 📄AnimationController.d.cts
│   │   ├── 📄AnimationController.d.ts
│   │   ├── 📄AnimationController.js
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄LightingController.cjs
│   │   ├── 📄LightingController.d.cts
│   │   ├── 📄LightingController.d.ts
│   │   ├── 📄LightingController.js
│   │   ├── 📄MaterialController.cjs
│   │   ├── 📄MaterialController.d.cts
│   │   ├── 📄MaterialController.d.ts
│   │   └── 📄MaterialController.js
│   ├── 📁primitives/
│   │   ├── 📄index.cjs
│   │   ├── 📄index.d.cts
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.js
│   │   ├── 📄SceneObject.cjs
│   │   ├── 📄SceneObject.d.cts
│   │   ├── 📄SceneObject.d.ts
│   │   └── 📄SceneObject.js
│   ├── 📄index.cjs
│   ├── 📄index.d.cts
│   ├── 📄index.d.ts
│   └── 📄index.js
├── 📄chunk-2JRLTZTT.cjs
├── 📄chunk-2RPXTPO6.cjs
├── 📄chunk-2RVJJR7H.js
├── 📄chunk-2T6X6FWL.js
├── 📄chunk-3EGJYHIY.js
├── 📄chunk-3NLDE54Y.cjs
├── 📄chunk-44UQAST6.cjs
├── 📄chunk-4SF665OB.cjs
├── 📄chunk-4ZER3XI5.cjs
├── 📄chunk-52BWUKU3.js
├── 📄chunk-5BVZFCCP.cjs
├── 📄chunk-5CEK7PZJ.cjs
├── 📄chunk-5JXXROSL.js
├── 📄chunk-5RGQXC4Q.js
├── 📄chunk-63FVQ6W5.js
├── 📄chunk-6CUOYUKS.cjs
├── 📄chunk-6IV7O3J7.cjs
├── 📄chunk-6J2YPQ3V.cjs
├── 📄chunk-6NFS7VGR.cjs
├── 📄chunk-6TM4FRPR.js
├── 📄chunk-6WNUQFM4.js
├── 📄chunk-6ZMRVN4U.cjs
├── 📄chunk-74PZZRJW.cjs
├── 📄chunk-74ZRFOSU.cjs
├── 📄chunk-777TCJKN.js
├── 📄chunk-7FDA57MA.js
├── 📄chunk-7IYEJKA2.cjs
├── 📄chunk-7QXP3UCX.js
├── 📄chunk-7T35AZSK.cjs
├── 📄chunk-7TGXES2R.cjs
├── 📄chunk-7W7IF4LU.cjs
├── 📄chunk-7WPOL7PK.cjs
├── 📄chunk-7YGHNVSE.cjs
├── 📄chunk-A2QGEYEP.js
├── 📄chunk-A42KOQBF.cjs
├── 📄chunk-A4DXMEHV.cjs
├── 📄chunk-AAWO2LOD.js
├── 📄chunk-AKGGKXIG.cjs
├── 📄chunk-AWVHTM2E.js
├── 📄chunk-B5ZMYPSV.cjs
├── 📄chunk-BALVQTQW.js
├── 📄chunk-BC7KT6LQ.js
├── 📄chunk-BCYOQOWO.js
├── 📄chunk-BFFAIN2F.cjs
├── 📄chunk-BZ5ZFRZF.js
├── 📄chunk-CPKJTF7R.js
├── 📄chunk-D3GACXGB.cjs
├── 📄chunk-D4NGW2TQ.js
├── 📄chunk-D5LBHGVM.js
├── 📄chunk-DCRMKZQR.js
├── 📄chunk-DF6YTEMA.cjs
├── 📄chunk-DJTECGV7.js
├── 📄chunk-DZXIPKHA.js
├── 📄chunk-E64RDZHI.js
├── 📄chunk-EA3XQ4KJ.cjs
├── 📄chunk-EC4WICT5.js
├── 📄chunk-EJFG4NQB.cjs
├── 📄chunk-ENL3GCXS.cjs
├── 📄chunk-EPN65WJP.js
├── 📄chunk-FBPG64NM.js
├── 📄chunk-FG7CAXA4.js
├── 📄chunk-FGTSUNZE.cjs
├── 📄chunk-FO3FPT2S.js
├── 📄chunk-FPJ6EVJX.js
├── 📄chunk-FSJKRDUF.js
├── 📄chunk-FVJJQCBE.cjs
├── 📄chunk-G5YWPRA4.js
├── 📄chunk-GH2JTQWG.cjs
├── 📄chunk-GICX4QCO.cjs
├── 📄chunk-GY6RJQO5.js
├── 📄chunk-H2D4KIM7.cjs
├── 📄chunk-H4347FME.js
├── 📄chunk-HPQJ52RN.js
├── 📄chunk-HVXJUMVE.js
├── 📄chunk-HZOLWSRN.cjs
├── 📄chunk-J3SAIRP2.js
├── 📄chunk-JAA5HFLZ.cjs
├── 📄chunk-JDA4ZSEU.cjs
├── 📄chunk-JH6IQNCJ.js
├── 📄chunk-JYZBSENP.cjs
├── 📄chunk-JZHNCTLD.js
├── 📄chunk-K6ZM23YX.cjs
├── 📄chunk-KJTLIEHP.js
├── 📄chunk-KPT4VK2F.cjs
├── 📄chunk-KYA4YMIA.js
├── 📄chunk-L3G2QMBD.js
├── 📄chunk-LVUBXCMG.js
├── 📄chunk-MAMG6W2Y.js
├── 📄chunk-MCYH2TBQ.cjs
├── 📄chunk-MLONVM7E.cjs
├── 📄chunk-MOVY2UVG.cjs
├── 📄chunk-MPDIJ7YY.cjs
├── 📄chunk-MQWF5VT4.js
├── 📄chunk-MVJKBTOT.cjs
├── 📄chunk-MYY4A5OI.cjs
├── 📄chunk-NCVXR6TI.js
├── 📄chunk-NFQVYY2K.js
├── 📄chunk-NNMHNVZD.js
├── 📄chunk-NTSUJG5U.cjs
├── 📄chunk-NZ3CBPO6.cjs
├── 📄chunk-OK2NCVM7.js
├── 📄chunk-OMXI6SA6.cjs
├── 📄chunk-OVHQQSEK.js
├── 📄chunk-PFUSRKMN.js
├── 📄chunk-PIWTMSS3.cjs
├── 📄chunk-POOGUPPI.js
├── 📄chunk-PQT455AL.cjs
├── 📄chunk-PRNY2PGZ.js
├── 📄chunk-Q3PTDMXU.cjs
├── 📄chunk-Q47SPRY7.js
├── 📄chunk-QGJ4OZHP.js
├── 📄chunk-QQ5BJTZO.js
├── 📄chunk-QRVOSZH3.cjs
├── 📄chunk-R3D4E7BR.cjs
├── 📄chunk-R4RSFB4I.js
├── 📄chunk-RAVPLUWO.js
├── 📄chunk-RBXUTBNN.js
├── 📄chunk-RUDNMJTZ.js
├── 📄chunk-RYKPLAWD.cjs
├── 📄chunk-RZ2USFMW.cjs
├── 📄chunk-RZYGMXQQ.js
├── 📄chunk-S3UAQAG6.cjs
├── 📄chunk-SAVKOGFV.cjs
├── 📄chunk-SCNS52XI.js
├── 📄chunk-SR4V6L3A.cjs
├── 📄chunk-SRDOYMT5.js
├── 📄chunk-SRUKCELR.js
├── 📄chunk-SWV662HL.js
├── 📄chunk-T2JEYSOH.cjs
├── 📄chunk-T2YGLA3W.cjs
├── 📄chunk-T7WRFGHQ.cjs
├── 📄chunk-TEHD4IKH.cjs
├── 📄chunk-TEOUZ4CU.js
├── 📄chunk-TOIGUY7S.cjs
├── 📄chunk-U5VU2PHI.js
├── 📄chunk-UHSU2JHH.cjs
├── 📄chunk-USBH24UK.cjs
├── 📄chunk-VCE2Y33G.cjs
├── 📄chunk-VHIECBSI.js
├── 📄chunk-VKKKQ5EP.cjs
├── 📄chunk-VMCDYQ3Z.cjs
├── 📄chunk-VOOSUWRJ.js
├── 📄chunk-VTSNXELB.js
├── 📄chunk-VWLE7Q67.js
├── 📄chunk-W2T32FMR.cjs
├── 📄chunk-WJQACPW7.js
├── 📄chunk-WSCGDMID.js
├── 📄chunk-WU53J4D2.js
├── 📄chunk-WVJX5QGT.js
├── 📄chunk-WZUWQ23V.cjs
├── 📄chunk-X6WAKL3Y.cjs
├── 📄chunk-XE447OR7.cjs
├── 📄chunk-XMJ5ENHF.cjs
├── 📄chunk-XRYVIMZ7.js
├── 📄chunk-XTA7BEZG.cjs
├── 📄chunk-XTNUGFKY.cjs
├── 📄chunk-XUB2VU6W.js
├── 📄chunk-Y4P4WJ2M.cjs
├── 📄chunk-YBM7VSHV.js
├── 📄chunk-YNRZBICS.js
├── 📄chunk-YTB7YJZG.cjs
├── 📄chunk-YWW62ACB.cjs
├── 📄chunk-ZC66QDE5.js
├── 📄chunk-ZHBHDU44.cjs
├── 📄index.cjs
├── 📄index.d.cts
├── 📄index.d.ts
├── 📄index.js
├── 📄SceneOrchestrator-PJwPoCeo.d.ts
└── 📄SceneOrchestrator-X3T7OXl7.d.cts
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

