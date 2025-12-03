# Estructura de: shared-3d#v1.0.5/
## Generated: 3/12/2025, 2:13:52 p.m.
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
│   ├── 📄three.cjs
│   ├── 📄three.d.cts
│   ├── 📄three.d.ts
│   └── 📄three.js
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
├── 📄chunk-2JCTTRJK.cjs
├── 📄chunk-2JRLTZTT.cjs
├── 📄chunk-2JXECOVZ.cjs
├── 📄chunk-2RPXTPO6.cjs
├── 📄chunk-3EGJYHIY.js
├── 📄chunk-3NLDE54Y.cjs
├── 📄chunk-44UQAST6.cjs
├── 📄chunk-4E2NMKOL.js
├── 📄chunk-4E3EEOIL.js
├── 📄chunk-4UVCRO2U.js
├── 📄chunk-52BWUKU3.js
├── 📄chunk-53O3DZBZ.js
├── 📄chunk-5RGQXC4Q.js
├── 📄chunk-63VW2TWG.js
├── 📄chunk-6FCATWGW.js
├── 📄chunk-6GG4QE2E.js
├── 📄chunk-6GOT3LNE.cjs
├── 📄chunk-6J2YPQ3V.cjs
├── 📄chunk-6LCQVJO2.cjs
├── 📄chunk-6V2VJ4DP.cjs
├── 📄chunk-6XZVAT27.cjs
├── 📄chunk-6ZMRVN4U.cjs
├── 📄chunk-777TCJKN.js
├── 📄chunk-7JTF6DFK.js
├── 📄chunk-7NTLIQ5L.js
├── 📄chunk-7QVNB5H2.cjs
├── 📄chunk-7SKSOFDT.cjs
├── 📄chunk-7T35AZSK.cjs
├── 📄chunk-7WPOL7PK.cjs
├── 📄chunk-7YGHNVSE.cjs
├── 📄chunk-AAHJLMZR.cjs
├── 📄chunk-ABM33I7Q.js
├── 📄chunk-AOP7YC3S.js
├── 📄chunk-AWDQRFMS.js
├── 📄chunk-AWVHTM2E.js
├── 📄chunk-B5ZMYPSV.cjs
├── 📄chunk-BKZZWXN7.js
├── 📄chunk-BLUMHM3U.cjs
├── 📄chunk-CHORX2B2.js
├── 📄chunk-CPKJTF7R.js
├── 📄chunk-CPMHERKH.js
├── 📄chunk-CQEMWGZM.cjs
├── 📄chunk-DCRMKZQR.js
├── 📄chunk-DF6YTEMA.cjs
├── 📄chunk-DLGDBYNQ.js
├── 📄chunk-DM3V3EJD.cjs
├── 📄chunk-DQJ64W2A.cjs
├── 📄chunk-DSWBE3MS.cjs
├── 📄chunk-E355IQ54.cjs
├── 📄chunk-E64RDZHI.js
├── 📄chunk-EA3XQ4KJ.cjs
├── 📄chunk-EC4WICT5.js
├── 📄chunk-ENL3GCXS.cjs
├── 📄chunk-EO54ZV26.cjs
├── 📄chunk-F6XUJOTZ.js
├── 📄chunk-F7F54MU6.js
├── 📄chunk-FBPG64NM.js
├── 📄chunk-FGTSUNZE.cjs
├── 📄chunk-FOTZCW7M.js
├── 📄chunk-FQDHSOLA.cjs
├── 📄chunk-G5YWPRA4.js
├── 📄chunk-GDQHY3XH.js
├── 📄chunk-GICX4QCO.cjs
├── 📄chunk-GJKUJGPC.cjs
├── 📄chunk-GY6RJQO5.js
├── 📄chunk-HB2MYA43.js
├── 📄chunk-HEYWZZTH.cjs
├── 📄chunk-HU5ILTIE.js
├── 📄chunk-HVXJUMVE.js
├── 📄chunk-HXIZIIK7.cjs
├── 📄chunk-IAGIA7J5.cjs
├── 📄chunk-IQZTNJXP.js
├── 📄chunk-IURPS66O.js
├── 📄chunk-IWWTL653.js
├── 📄chunk-J3SAIRP2.js
├── 📄chunk-JDA4ZSEU.cjs
├── 📄chunk-JH6IQNCJ.js
├── 📄chunk-JQEF7TLI.js
├── 📄chunk-JRZZWX2L.cjs
├── 📄chunk-JWY4ZHHB.js
├── 📄chunk-K74YUHIW.js
├── 📄chunk-L3G2QMBD.js
├── 📄chunk-LKN5DUEK.cjs
├── 📄chunk-LRQU432L.cjs
├── 📄chunk-M3WZHTGS.js
├── 📄chunk-MAROSTDG.js
├── 📄chunk-MCYH2TBQ.cjs
├── 📄chunk-MLONVM7E.cjs
├── 📄chunk-MXTWNZ2R.cjs
├── 📄chunk-MZEYSNNV.js
├── 📄chunk-NJLVDX7J.cjs
├── 📄chunk-NJTG637C.cjs
├── 📄chunk-OASOCNNE.js
├── 📄chunk-ODHFJDWB.js
├── 📄chunk-OIMHWLGO.cjs
├── 📄chunk-OQRRGPYA.js
├── 📄chunk-OVHQQSEK.js
├── 📄chunk-OVWVQSTO.js
├── 📄chunk-OZMJ7FZP.cjs
├── 📄chunk-P2AJYPTQ.js
├── 📄chunk-PFUSRKMN.js
├── 📄chunk-POOGUPPI.js
├── 📄chunk-PRBLBCJY.cjs
├── 📄chunk-PRNY2PGZ.js
├── 📄chunk-PSPUBVLG.js
├── 📄chunk-PU435NPJ.cjs
├── 📄chunk-Q3PTDMXU.cjs
├── 📄chunk-Q47SPRY7.js
├── 📄chunk-Q7FTH3IX.js
├── 📄chunk-QRVOSZH3.cjs
├── 📄chunk-QXT4UOVW.cjs
├── 📄chunk-R4RSFB4I.js
├── 📄chunk-R55G7KGT.js
├── 📄chunk-R65OL446.js
├── 📄chunk-RBA35FKK.js
├── 📄chunk-REQUZTZ4.js
├── 📄chunk-RMDAOZAB.js
├── 📄chunk-RSLPNPEF.js
├── 📄chunk-RUDNMJTZ.js
├── 📄chunk-RVXJL5Y6.cjs
├── 📄chunk-S3UAQAG6.cjs
├── 📄chunk-SCNS52XI.js
├── 📄chunk-SGTRREOB.js
├── 📄chunk-SR4V6L3A.cjs
├── 📄chunk-SRDOYMT5.js
├── 📄chunk-SRUKCELR.js
├── 📄chunk-T2JEYSOH.cjs
├── 📄chunk-T76SZNWB.cjs
├── 📄chunk-TGXXEJSX.js
├── 📄chunk-TOIGUY7S.cjs
├── 📄chunk-U5CPUAWO.cjs
├── 📄chunk-UHUPI6C6.js
├── 📄chunk-UOOBMWYR.cjs
├── 📄chunk-USBH24UK.cjs
├── 📄chunk-VBJXO26F.cjs
├── 📄chunk-VHIECBSI.js
├── 📄chunk-VNBQSAVJ.js
├── 📄chunk-VSGR5OAY.cjs
├── 📄chunk-VTSNXELB.js
├── 📄chunk-W2T32FMR.cjs
├── 📄chunk-W4PDMXIP.cjs
├── 📄chunk-WMVRZW2V.cjs
├── 📄chunk-WNGGJVWU.cjs
├── 📄chunk-WXJPQIIO.cjs
├── 📄chunk-XCRTY56R.cjs
├── 📄chunk-XDEX2LI3.cjs
├── 📄chunk-XI27L5KU.cjs
├── 📄chunk-XMJ5ENHF.cjs
├── 📄chunk-XTA7BEZG.cjs
├── 📄chunk-XTNUGFKY.cjs
├── 📄chunk-XU4WJ4NO.cjs
├── 📄chunk-XW2RYNM3.js
├── 📄chunk-YWKI45MO.cjs
├── 📄chunk-YWUD57CE.cjs
├── 📄chunk-YXY77P4V.cjs
├── 📄chunk-Z5NU22YL.js
├── 📄chunk-ZC66QDE5.js
├── 📄chunk-ZEGAOKBQ.cjs
├── 📄chunk-ZRBGFD3Z.js
├── 📄chunk-ZUME5OVE.cjs
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

