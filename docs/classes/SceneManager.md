[**shared-3d**](../README.md)

***

[shared-3d](../globals.md) / SceneManager

# Class: SceneManager

Defined in: [core/SceneManager.ts:76](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L76)

SceneManager class that manages a 3D scene using Three.js.
It handles rendering, model loading, camera controls, and post-processing effects.

## Param

The canvas element where the scene will be rendered.

## Param

Configuration options for the scene.

## Param

Whether to enable antialiasing in the renderer.

## Param

Whether to enable post-processing effects.

## Param

Whether to enable shadows in the scene.

## Param

The pixel ratio for the renderer.

## Param

The background color of the scene.

## Example

```ts
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const sceneManager = new SceneManager(canvas, {
  antialias: true,
  postprocessing: true,
  shadows: true,
  pixelRatio: window.devicePixelRatio,
  background: new THREE.Color(0x000000)
});
sceneManager.animate();
```

## See

 - [Documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene|Three.js)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/controls/OrbitControls|OrbitControls)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer|EffectComposer)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader|GLTFLoader)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/postprocessing/SMAAPass|SMAAPass)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/postprocessing/SSAARenderPass|SSAARenderPass)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/postprocessing/TAARenderPass|TAARenderPass)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/lights/AmbientLight|AmbientLight)
 - [Documentation](https://threejs.org/docs/index.html#examples/en/lights/DirectionalLight|DirectionalLight)
 - [Documentation](https://threejs.org/docs/index.html#api/en/materials/Material|Material)
 - [Documentation](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial|MeshBasicMaterial)
 - [Documentation](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial|MeshPhongMaterial)
 - [Documentation](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial|MeshStandardMaterial)
 - [Documentation](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial|MeshPhysicalMaterial)
 - [Documentation](https://threejs.org/docs/index.html#api/en/math/Box3|Box3)
 - [Documentation](https://threejs.org/docs/index.html#api/en/math/Sphere|Sphere)
 - [Documentation](https://threejs.org/docs/index.html#api/en/math/Vector3|Vector3)
 - [Documentation](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera|PerspectiveCamera)
 - [Documentation](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer|WebGLRenderer)
 - [Documentation](https://threejs.org/docs/index.html#api/en/scenes/Scene|Scene)
 - [Documentation](https://threejs.org/docs/index.html#api/en/core/Object3D|Object3D)
 - [Documentation](https://threejs.org/docs/index.html#api/en/core/Material|Material)
 - [Documentation](https://threejs.org/docs/index.html#api/en/core/BufferGeometry|BufferGeometry)
 - [Documentation](https://threejs.org/docs/index.html#api/en/core/Geometry|Geometry)
 - [Documentation](https://threejs.org/docs/index.html#api/en/core/Loader|Loader)
 - [Documentation](https://threejs.org/docs/index.html#api/en/core/LoaderUtils|LoaderUtils)

## Constructors

### Constructor

> **new SceneManager**(`canvas`, `config?`): `SceneManager`

Defined in: [core/SceneManager.ts:123](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L123)

Creates an instance of SceneManager.
Initializes the Three.js scene, camera, renderer, and optional post-processing effects.

#### Parameters

##### canvas

`HTMLCanvasElement`

The canvas element where the scene will be rendered.

##### config?

Configuration options for the scene.

###### antialias?

`boolean`

Whether to enable antialiasing in the renderer.

###### background?

`Color`

The background color of the scene.

###### pixelRatio?

`number`

The pixel ratio for the renderer.

###### postprocessing?

`boolean`

Whether to enable post-processing effects.

###### shadows?

`boolean`

Whether to enable shadows in the scene.

#### Returns

`SceneManager`

#### Example

```ts
´´´tsx
//Initializes a Three.js scene with a canvas and basic configuration.
import { SceneManager } from '@types/shared-3d';
import * as THREE from '@types/shared-3d';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const sceneManager = new SceneManager(canvas, {
  antialias: true,
  postprocessing: true,
  shadows: true,
  pixelRatio: window.devicePixelRatio,
  background: new THREE.Color(0x000000)
});
sceneManager.animate();
´´´
```

## Methods

### animate()

> **animate**(): `void`

Defined in: [core/SceneManager.ts:764](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L764)

Starts the animation loop for rendering the scene.
It uses requestAnimationFrame to continuously render the scene and update controls if available.
If post-processing is enabled, it renders through the composer, otherwise directly through the renderer.

#### Returns

`void`

***

### applyActiveParallax()

> **applyActiveParallax**(`progress`): `void`

Defined in: [core/SceneManager.ts:885](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L885)

Applies the active parallax effect to the currently active model.
This function checks if there is an active model and applies the parallax effect to it.

#### Parameters

##### progress

`number`

Progress value to apply the parallax effect.

#### Returns

`void`

#### See

[SceneManager.applyParallaxEffect](#applyparallaxeffect)

#### Example

```ts
sceneManager.applyActiveParallax(0.5); // Applies the parallax effect
to the active model with a progress of 0.5.
```

***

### applyAllParallaxEffects()

> **applyAllParallaxEffects**(`progress`): `void`

Defined in: [core/SceneManager.ts:897](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L897)

Applies all registered parallax effects based on the provided progress value.
This function iterates through all parallax effects and applies them.

#### Parameters

##### progress

`number`

Progress value to apply the parallax effects.

#### Returns

`void`

***

### applyParallaxEffect()

> **applyParallaxEffect**(`modelId`, `progress`): `void`

Defined in: [core/SceneManager.ts:870](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L870)

Applies a parallax effect to a specific model based on its ID and progress.
This function retrieves the effect from the map and applies it.

#### Parameters

##### modelId

`string`

Unique identifier for the model.

##### progress

`number`

Progress value to apply the parallax effect.

#### Returns

`void`

***

### createParallaxEffect()

> **createParallaxEffect**(`modelId`, `intensity?`, `axis?`): (`progress`) => `void`

Defined in: [core/SceneManager.ts:834](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L834)

Creates a parallax effect for a specific model.
The effect is applied based on the scroll progress and can be configured for different axes.

#### Parameters

##### modelId

`string`

Unique identifier for the model.

##### intensity?

`number` = `0.1`

Intensity of the parallax effect.

##### axis?

Axis or axes to apply the parallax effect.

`"x"` | `"y"` | `"z"` | `"xy"` | `"xyz"`

#### Returns

Function to apply the parallax effect based on progress.

> (`progress`): `void`

##### Parameters

###### progress

`number`

##### Returns

`void`

***

### createRotationEffect()

> **createRotationEffect**(`modelId`, `intensity?`, `axis?`): (`progress`) => `void`

Defined in: [core/SceneManager.ts:909](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L909)

Creates a rotation effect for a specific model based on its ID and intensity.
The effect rotates the model around a specified axis based on the progress value.

#### Parameters

##### modelId

`string`

Unique identifier for the model.

##### intensity?

`number` = `0.01`

Intensity of the rotation effect.

##### axis?

Axis to rotate the model around.

`"x"` | `"y"` | `"z"`

#### Returns

Function to apply the rotation effect based on progress.

> (`progress`): `void`

##### Parameters

###### progress

`number`

##### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: [core/SceneManager.ts:786](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L786)

Disposes of the scene manager resources.
It disconnects the resize observer, disposes of the renderer,
removes all models from the scene, and disposes of controls if they exist.

#### Returns

`void`

***

### getCamera()

> **getCamera**(): `PerspectiveCamera`

Defined in: [core/SceneManager.ts:754](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L754)

Gets the Three.js scene object.
This is the main container for all objects, lights, and cameras in the scene.

#### Returns

`PerspectiveCamera`

The Three.js scene object.

***

### getModel()

> **getModel**(`id`): `undefined` \| `Object3D`\<`Object3DEventMap`\>

Defined in: [core/SceneManager.ts:678](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L678)

Retrieves a model by its ID.

#### Parameters

##### id

`string`

Unique identifier for the model.

#### Returns

`undefined` \| `Object3D`\<`Object3DEventMap`\>

The model if found, otherwise undefined.

***

### getModelActiveId()

> **getModelActiveId**(): `null` \| `string`

Defined in: [core/SceneManager.ts:201](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L201)

Gets the ID of the currently active model in the scene.
If no model is active, it returns null.

#### Returns

`null` \| `string`

The ID of the active model or null if no model is active.

#### Memberof

SceneManager

***

### getScene()

> **getScene**(): `Scene`

Defined in: [core/SceneManager.ts:191](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L191)

Starts the animation loop for rendering the scene.
It continuously renders the scene and updates the controls if they are enabled.

#### Returns

`Scene`

***

### hasModel()

> **hasModel**(`id`): `boolean`

Defined in: [core/SceneManager.ts:593](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L593)

Checks if a model with the given ID has been loaded.

#### Parameters

##### id

`string`

Unique identifier for the model.

#### Returns

`boolean`

True if the model is loaded, false otherwise.

***

### loadModel()

> **loadModel**(`id`, `url`, `onStateChange?`): `Promise`\<`Object3D`\<`Object3DEventMap`\>\>

Defined in: [core/SceneManager.ts:502](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L502)

Loads a 3D model from a given URL and adds it to the scene.
If the model is already loaded, it returns the existing model.
If the model is currently loading, it returns the existing promise.

#### Parameters

##### id

`string`

Unique identifier for the model.

##### url

`string`

URL of the model to load.

##### onStateChange?

(`status`, `details`) => `void`

Optional callback function to report loading state changes.

#### Returns

`Promise`\<`Object3D`\<`Object3DEventMap`\>\>

A promise that resolves to the loaded model.

***

### preloadModels()

> **preloadModels**(`models`): `void`

Defined in: [core/SceneManager.ts:368](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L368)

Preloads models by their IDs and URLs.
This method loads models in the background without adding them to the scene immediately.
It allows for faster transitions later by preloading models that will be used frequently.

#### Parameters

##### models

`object`[]

Array of model objects with id and url.

#### Returns

`void`

***

### resetCameraForModel()

> **resetCameraForModel**(`modelId`): `void`

Defined in: [core/SceneManager.ts:656](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L656)

Resets the camera position for a specific model

#### Parameters

##### modelId

`string`

ID of the model to reset camera for

#### Returns

`void`

***

### setMaterial()

> **setMaterial**(`id`, `materialType`, `options`): `void`

Defined in: [core/SceneManager.ts:702](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L702)

Sets the material of a model by its ID.
It traverses the model's children and applies the specified material type with options.

#### Parameters

##### id

`string`

Unique identifier for the model.

##### materialType

Type of material to apply.

`"basic"` | `"phong"` | `"standard"` | `"physical"`

##### options

`MaterialParameters`

Parameters for the material.

#### Returns

`void`

***

### setupModelOrbitControls()

> **setupModelOrbitControls**(`options`): `OrbitControls`

Defined in: [core/SceneManager.ts:332](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L332)

Sets up orbit controls for the camera based on the currently active model.
This allows the user to rotate, zoom, and pan the camera around the active model.

#### Parameters

##### options

Options for configuring the orbit controls.

###### enablePan?

`boolean`

Whether to enable panning of the camera.

###### enableRotate?

`boolean`

Whether to enable rotation of the camera.

###### enableZoom?

`boolean`

Whether to enable zooming of the camera.

#### Returns

`OrbitControls`

The configured OrbitControls instance for the active model.

#### Throws

If no active model is set or if the active model does not exist in the scene.

***

### setupOrbitControls()

> **setupOrbitControls**(`options`): `OrbitControls`

Defined in: [core/SceneManager.ts:312](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L312)

Sets up orbit controls for the camera.
This allows the user to rotate, zoom, and pan the camera around the scene.

#### Parameters

##### options

Options for configuring the orbit controls.

###### enablePan?

`boolean`

Whether to enable panning of the camera.

###### enableRotate?

`boolean`

Whether to enable rotation of the camera.

###### enableZoom?

`boolean`

Whether to enable zooming of the camera.

#### Returns

`OrbitControls`

The configured OrbitControls instance.

***

### setupParallaxEffect()

> **setupParallaxEffect**(`intensity?`, `axis?`): (`scrollProgress`) => `void`

Defined in: [core/SceneManager.ts:800](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L800)

Sets up a parallax effect for all models in the scene.
The effect is applied based on the scroll progress and can be configured for different axes.

#### Parameters

##### intensity?

`number` = `0.1`

Intensity of the parallax effect.

##### axis?

Axis or axes to apply the parallax effect.

`"x"` | `"y"` | `"z"` | `"xy"` | `"xyz"`

#### Returns

Function to apply the parallax effect based on scroll progress.

> (`scrollProgress`): `void`

##### Parameters

###### scrollProgress

`number`

##### Returns

`void`

***

### setWireframe()

> **setWireframe**(`id`, `enabled`): `void`

Defined in: [core/SceneManager.ts:739](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L739)

Sets the wireframe mode for a model by its ID.
It traverses the model's children and enables or disables wireframe mode.

#### Parameters

##### id

`string`

Unique identifier for the model.

##### enabled

`boolean`

Whether to enable wireframe mode.

#### Returns

`void`

***

### transitionToModel()

> **transitionToModel**(`targetId`): `void`

Defined in: [core/SceneManager.ts:437](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L437)

Transitions to a model with a specified ID.
This method handles the transition effect between the currently active model and the target model.
It uses a fade-in and fade-out effect to smoothly switch between models.

#### Parameters

##### targetId

`string`

The ID of the model to transition to.

#### Returns

`void`

***

### updateModel()

> **updateModel**(`id`, `updater`): `void`

Defined in: [core/SceneManager.ts:689](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/SceneManager.ts#L689)

Updates a model by its ID using a provided updater function.
The updater function receives the model as an argument and can modify it.

#### Parameters

##### id

`string`

Unique identifier for the model.

##### updater

(`model`) => `void`

Function to update the model.

#### Returns

`void`
