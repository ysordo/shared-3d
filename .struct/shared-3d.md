# Estructura de: shared-3d#v1.0.5/
## Generated: 3/12/2025, 9:45:03 a.m.
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
├── 📄index.d.ts
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
│   ├── 📄CacheContext.d.ts
│   ├── 📄CacheContext.d.ts.map
│   ├── 📄CacheContext.js
│   ├── 📄CacheContext.js.map
│   ├── 📄index.d.ts
│   ├── 📄index.d.ts.map
│   ├── 📄index.js
│   ├── 📄index.js.map
│   ├── 📄SceneContext.d.ts
│   ├── 📄SceneContext.d.ts.map
│   ├── 📄SceneContext.js
│   └── 📄SceneContext.js.map
├── 📁core/
│   ├── 📁cache/
│   │   ├── 📁server/
│   │   │   ├── 📄generateManifest.d.ts
│   │   │   ├── 📄generateManifest.d.ts.map
│   │   │   ├── 📄generateManifest.js
│   │   │   ├── 📄generateManifest.js.map
│   │   │   ├── 📄index.server.d.ts
│   │   │   ├── 📄index.server.d.ts.map
│   │   │   ├── 📄index.server.js
│   │   │   └── 📄index.server.js.map
│   │   ├── 📁utils/
│   │   │   ├── 📄env.d.ts
│   │   │   ├── 📄env.d.ts.map
│   │   │   ├── 📄env.js
│   │   │   └── 📄env.js.map
│   │   ├── 📄CacheValidator.d.ts
│   │   ├── 📄CacheValidator.d.ts.map
│   │   ├── 📄CacheValidator.js
│   │   ├── 📄CacheValidator.js.map
│   │   ├── 📄FileWatcher.d.ts
│   │   ├── 📄FileWatcher.d.ts.map
│   │   ├── 📄FileWatcher.js
│   │   ├── 📄FileWatcher.js.map
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄ObjectCache.d.ts
│   │   ├── 📄ObjectCache.d.ts.map
│   │   ├── 📄ObjectCache.js
│   │   ├── 📄ObjectCache.js.map
│   │   ├── 📄types.d.ts
│   │   ├── 📄types.d.ts.map
│   │   ├── 📄types.js
│   │   └── 📄types.js.map
│   ├── 📁loaders/
│   │   ├── 📄GLTFLoader.d.ts
│   │   ├── 📄GLTFLoader.d.ts.map
│   │   ├── 📄GLTFLoader.js
│   │   ├── 📄GLTFLoader.js.map
│   │   ├── 📄HDRILoader.d.ts
│   │   ├── 📄HDRILoader.d.ts.map
│   │   ├── 📄HDRILoader.js
│   │   ├── 📄HDRILoader.js.map
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄WebPHDRLoader.d.ts
│   │   ├── 📄WebPHDRLoader.d.ts.map
│   │   ├── 📄WebPHDRLoader.js
│   │   └── 📄WebPHDRLoader.js.map
│   ├── 📁orchestrator/
│   │   ├── 📁plugins/
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.d.ts
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.d.ts.map
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.js
│   │   │   ├── 📄AdvancedCameraCollisionPlugin.js.map
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.d.ts
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.d.ts.map
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.js
│   │   │   ├── 📄AdvancedOrbitControlsPlugin.js.map
│   │   │   ├── 📄AdvancedRaycasterPlugin.d.ts
│   │   │   ├── 📄AdvancedRaycasterPlugin.d.ts.map
│   │   │   ├── 📄AdvancedRaycasterPlugin.js
│   │   │   ├── 📄AdvancedRaycasterPlugin.js.map
│   │   │   ├── 📄AnnotationsPlugin.d.ts
│   │   │   ├── 📄AnnotationsPlugin.d.ts.map
│   │   │   ├── 📄AnnotationsPlugin.js
│   │   │   ├── 📄AnnotationsPlugin.js.map
│   │   │   ├── 📄AutoLODSystemPlugin.d.ts
│   │   │   ├── 📄AutoLODSystemPlugin.d.ts.map
│   │   │   ├── 📄AutoLODSystemPlugin.js
│   │   │   ├── 📄AutoLODSystemPlugin.js.map
│   │   │   ├── 📄HotspotPlugin.d.ts
│   │   │   ├── 📄HotspotPlugin.d.ts.map
│   │   │   ├── 📄HotspotPlugin.js
│   │   │   ├── 📄HotspotPlugin.js.map
│   │   │   ├── 📄index.d.ts
│   │   │   ├── 📄index.d.ts.map
│   │   │   ├── 📄index.js
│   │   │   ├── 📄index.js.map
│   │   │   ├── 📄LODSystemPlugin.d.ts
│   │   │   ├── 📄LODSystemPlugin.d.ts.map
│   │   │   ├── 📄LODSystemPlugin.js
│   │   │   ├── 📄LODSystemPlugin.js.map
│   │   │   ├── 📄MeasurementToolPlugin.d.ts
│   │   │   ├── 📄MeasurementToolPlugin.d.ts.map
│   │   │   ├── 📄MeasurementToolPlugin.js
│   │   │   ├── 📄MeasurementToolPlugin.js.map
│   │   │   ├── 📄OrbitControlsPlugin.d.ts
│   │   │   ├── 📄OrbitControlsPlugin.d.ts.map
│   │   │   ├── 📄OrbitControlsPlugin.js
│   │   │   ├── 📄OrbitControlsPlugin.js.map
│   │   │   ├── 📄PostProcessingPlugin.d.ts
│   │   │   ├── 📄PostProcessingPlugin.d.ts.map
│   │   │   ├── 📄PostProcessingPlugin.js
│   │   │   ├── 📄PostProcessingPlugin.js.map
│   │   │   ├── 📄RaycasterPlugin.d.ts
│   │   │   ├── 📄RaycasterPlugin.d.ts.map
│   │   │   ├── 📄RaycasterPlugin.js
│   │   │   └── 📄RaycasterPlugin.js.map
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄SceneOrchestrator.d.ts
│   │   ├── 📄SceneOrchestrator.d.ts.map
│   │   ├── 📄SceneOrchestrator.js
│   │   ├── 📄SceneOrchestrator.js.map
│   │   ├── 📄types.d.ts
│   │   ├── 📄types.d.ts.map
│   │   ├── 📄types.js
│   │   └── 📄types.js.map
│   ├── 📁utils/
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄QuadWireframe.d.ts
│   │   ├── 📄QuadWireframe.d.ts.map
│   │   ├── 📄QuadWireframe.js
│   │   └── 📄QuadWireframe.js.map
│   ├── 📄index.d.ts
│   ├── 📄index.d.ts.map
│   ├── 📄index.js
│   └── 📄index.js.map
├── 📁hooks/
│   ├── 📄index.d.ts
│   ├── 📄index.d.ts.map
│   ├── 📄index.js
│   ├── 📄index.js.map
│   ├── 📄useActiveModel.d.ts
│   ├── 📄useActiveModel.d.ts.map
│   ├── 📄useActiveModel.js
│   ├── 📄useActiveModel.js.map
│   ├── 📄useAnimation.d.ts
│   ├── 📄useAnimation.d.ts.map
│   ├── 📄useAnimation.js
│   ├── 📄useAnimation.js.map
│   ├── 📄useCache.d.ts
│   ├── 📄useCache.d.ts.map
│   ├── 📄useCache.js
│   ├── 📄useCache.js.map
│   ├── 📄useHDRI.d.ts
│   ├── 📄useHDRI.d.ts.map
│   ├── 📄useHDRI.js
│   ├── 📄useHDRI.js.map
│   ├── 📄useModel.d.ts
│   ├── 📄useModel.d.ts.map
│   ├── 📄useModel.js
│   ├── 📄useModel.js.map
│   ├── 📄useRaycaster.d.ts
│   ├── 📄useRaycaster.d.ts.map
│   ├── 📄useRaycaster.js
│   ├── 📄useRaycaster.js.map
│   ├── 📄useScene.d.ts
│   ├── 📄useScene.d.ts.map
│   ├── 📄useScene.js
│   └── 📄useScene.js.map
├── 📁lib/
│   ├── 📄index.d.ts
│   ├── 📄index.d.ts.map
│   ├── 📄index.js
│   ├── 📄index.js.map
│   ├── 📄three.d.ts
│   ├── 📄three.d.ts.map
│   ├── 📄three.js
│   ├── 📄three.js.map
│   ├── 📄types.d.ts
│   ├── 📄types.d.ts.map
│   ├── 📄types.js
│   └── 📄types.js.map
├── 📁react/
│   ├── 📁components/
│   │   ├── 📄AdvancedCameraCollision.d.ts
│   │   ├── 📄AdvancedCameraCollision.d.ts.map
│   │   ├── 📄AdvancedCameraCollision.js
│   │   ├── 📄AdvancedCameraCollision.js.map
│   │   ├── 📄AdvancedDragRaycaster.d.ts
│   │   ├── 📄AdvancedDragRaycaster.d.ts.map
│   │   ├── 📄AdvancedDragRaycaster.js
│   │   ├── 📄AdvancedDragRaycaster.js.map
│   │   ├── 📄AdvancedOrbitControls.d.ts
│   │   ├── 📄AdvancedOrbitControls.d.ts.map
│   │   ├── 📄AdvancedOrbitControls.js
│   │   ├── 📄AdvancedOrbitControls.js.map
│   │   ├── 📄AdvancedRaycaster.d.ts
│   │   ├── 📄AdvancedRaycaster.d.ts.map
│   │   ├── 📄AdvancedRaycaster.js
│   │   ├── 📄AdvancedRaycaster.js.map
│   │   ├── 📄AmbientLight.d.ts
│   │   ├── 📄AmbientLight.d.ts.map
│   │   ├── 📄AmbientLight.js
│   │   ├── 📄AmbientLight.js.map
│   │   ├── 📄AnimationTimeline.d.ts
│   │   ├── 📄AnimationTimeline.d.ts.map
│   │   ├── 📄AnimationTimeline.js
│   │   ├── 📄AnimationTimeline.js.map
│   │   ├── 📄Annotations.d.ts
│   │   ├── 📄Annotations.d.ts.map
│   │   ├── 📄Annotations.js
│   │   ├── 📄Annotations.js.map
│   │   ├── 📄ARButton.d.ts
│   │   ├── 📄ARButton.d.ts.map
│   │   ├── 📄ARButton.js
│   │   ├── 📄ARButton.js.map
│   │   ├── 📄AutoLODSystem.d.ts
│   │   ├── 📄AutoLODSystem.d.ts.map
│   │   ├── 📄AutoLODSystem.js
│   │   ├── 📄AutoLODSystem.js.map
│   │   ├── 📄Canvas.d.ts
│   │   ├── 📄Canvas.d.ts.map
│   │   ├── 📄Canvas.js
│   │   ├── 📄Canvas.js.map
│   │   ├── 📄DirectionalLight.d.ts
│   │   ├── 📄DirectionalLight.d.ts.map
│   │   ├── 📄DirectionalLight.js
│   │   ├── 📄DirectionalLight.js.map
│   │   ├── 📄DistanceDisplay.d.ts
│   │   ├── 📄DistanceDisplay.d.ts.map
│   │   ├── 📄DistanceDisplay.js
│   │   ├── 📄DistanceDisplay.js.map
│   │   ├── 📄EnvironmentPreset.d.ts
│   │   ├── 📄EnvironmentPreset.d.ts.map
│   │   ├── 📄EnvironmentPreset.js
│   │   ├── 📄EnvironmentPreset.js.map
│   │   ├── 📄ErrorBoundary3D.d.ts
│   │   ├── 📄ErrorBoundary3D.d.ts.map
│   │   ├── 📄ErrorBoundary3D.js
│   │   ├── 📄ErrorBoundary3D.js.map
│   │   ├── 📄GroundSurface.d.ts
│   │   ├── 📄GroundSurface.d.ts.map
│   │   ├── 📄GroundSurface.js
│   │   ├── 📄GroundSurface.js.map
│   │   ├── 📄HDRI.d.ts
│   │   ├── 📄HDRI.d.ts.map
│   │   ├── 📄HDRI.js
│   │   ├── 📄HDRI.js.map
│   │   ├── 📄Hotspot.d.ts
│   │   ├── 📄Hotspot.d.ts.map
│   │   ├── 📄Hotspot.js
│   │   ├── 📄Hotspot.js.map
│   │   ├── 📄Hotspots.d.ts
│   │   ├── 📄Hotspots.d.ts.map
│   │   ├── 📄Hotspots.js
│   │   ├── 📄Hotspots.js.map
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄InstancedModel.d.ts
│   │   ├── 📄InstancedModel.d.ts.map
│   │   ├── 📄InstancedModel.js
│   │   ├── 📄InstancedModel.js.map
│   │   ├── 📄LODSystem.d.ts
│   │   ├── 📄LODSystem.d.ts.map
│   │   ├── 📄LODSystem.js
│   │   ├── 📄LODSystem.js.map
│   │   ├── 📄MeasurementTool.d.ts
│   │   ├── 📄MeasurementTool.d.ts.map
│   │   ├── 📄MeasurementTool.js
│   │   ├── 📄MeasurementTool.js.map
│   │   ├── 📄Model.d.ts
│   │   ├── 📄Model.d.ts.map
│   │   ├── 📄Model.js
│   │   ├── 📄Model.js.map
│   │   ├── 📄ModelPreload.d.ts
│   │   ├── 📄ModelPreload.d.ts.map
│   │   ├── 📄ModelPreload.js
│   │   ├── 📄ModelPreload.js.map
│   │   ├── 📄OrbitControls.d.ts
│   │   ├── 📄OrbitControls.d.ts.map
│   │   ├── 📄OrbitControls.js
│   │   ├── 📄OrbitControls.js.map
│   │   ├── 📄PointLight.d.ts
│   │   ├── 📄PointLight.d.ts.map
│   │   ├── 📄PointLight.js
│   │   ├── 📄PointLight.js.map
│   │   ├── 📄PostProcessing.d.ts
│   │   ├── 📄PostProcessing.d.ts.map
│   │   ├── 📄PostProcessing.js
│   │   ├── 📄PostProcessing.js.map
│   │   ├── 📄Raycaster.d.ts
│   │   ├── 📄Raycaster.d.ts.map
│   │   ├── 📄Raycaster.js
│   │   ├── 📄Raycaster.js.map
│   │   ├── 📄SpotLight.d.ts
│   │   ├── 📄SpotLight.d.ts.map
│   │   ├── 📄SpotLight.js
│   │   ├── 📄SpotLight.js.map
│   │   ├── 📄Suspense.d.ts
│   │   ├── 📄Suspense.d.ts.map
│   │   ├── 📄Suspense.js
│   │   ├── 📄Suspense.js.map
│   │   ├── 📄SuspenseModel.d.ts
│   │   ├── 📄SuspenseModel.d.ts.map
│   │   ├── 📄SuspenseModel.js
│   │   ├── 📄SuspenseModel.js.map
│   │   ├── 📄TheaterLighting.d.ts
│   │   ├── 📄TheaterLighting.d.ts.map
│   │   ├── 📄TheaterLighting.js
│   │   ├── 📄TheaterLighting.js.map
│   │   ├── 📄VRButton.d.ts
│   │   ├── 📄VRButton.d.ts.map
│   │   ├── 📄VRButton.js
│   │   └── 📄VRButton.js.map
│   ├── 📁controls/
│   │   ├── 📄AnimationController.d.ts
│   │   ├── 📄AnimationController.d.ts.map
│   │   ├── 📄AnimationController.js
│   │   ├── 📄AnimationController.js.map
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄LightingController.d.ts
│   │   ├── 📄LightingController.d.ts.map
│   │   ├── 📄LightingController.js
│   │   ├── 📄LightingController.js.map
│   │   ├── 📄MaterialController.d.ts
│   │   ├── 📄MaterialController.d.ts.map
│   │   ├── 📄MaterialController.js
│   │   └── 📄MaterialController.js.map
│   ├── 📁primitives/
│   │   ├── 📄index.d.ts
│   │   ├── 📄index.d.ts.map
│   │   ├── 📄index.js
│   │   ├── 📄index.js.map
│   │   ├── 📄SceneObject.d.ts
│   │   ├── 📄SceneObject.d.ts.map
│   │   ├── 📄SceneObject.js
│   │   └── 📄SceneObject.js.map
│   ├── 📄index.d.ts
│   ├── 📄index.d.ts.map
│   ├── 📄index.js
│   └── 📄index.js.map
├── 📄index.d.ts
├── 📄index.d.ts.map
├── 📄index.js
└── 📄index.js.map
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

