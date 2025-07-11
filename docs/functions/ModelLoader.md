[**shared-3d**](../README.md)

***

[shared-3d](../globals.md) / ModelLoader

# Function: ModelLoader()

> **ModelLoader**(`props`): `null`

Defined in: [react/ModelLoader.ts:43](https://github.com/ysordo/shared-3d/blob/b6432fb3e17dac484f77d6ff1862cd9a4f0ddf38/src/react/ModelLoader.ts#L43)

Component to load a 3D model into the scene.
It uses the SceneManager from the SceneContext to load the model.

## Parameters

### props

`ModelLoaderProps`

Properties for the ModelLoader component.

## Returns

`null`

- This component does not render anything to the DOM.

## Example

```jsx
<ModelLoader
  id="myModel"
  url="/path/to/model.gltf"
  onLoaded={(model) => console.log('Model loaded:', model)}
  onProgress={(download) => console.log('Download:', download)}
  onError={(error) => console.error('Error loading model:', error)}
/>
```
