[**shared-3d**](../README.md)

***

[shared-3d](../globals.md) / SceneContext

# Variable: SceneContext

> `const` **SceneContext**: `Context`\<\{ `canvas`: `null` \| `HTMLCanvasElement`; `sceneManager`: `null` \| [`SceneManager`](../classes/SceneManager.md); \}\>

Defined in: [react/SceneContext.ts:30](https://github.com/ysordo/shared-3d/blob/b6432fb3e17dac484f77d6ff1862cd9a4f0ddf38/src/react/SceneContext.ts#L30)

Context to handle the scene and canvas in the React application.
It provides access to the SceneManager and Canvas HTML.

## Example

```tsx
import { useSceneContext } from './SceneContext';
const MyComponent = () => {
  const { sceneManager, canvas } = useSceneContext();
  // Puedes usar sceneManager y canvas aquí
  return <div>My Scene Component</div>;
};
```

## See

 - [SceneManager](../classes/SceneManager.md) For more details on how to handle the scene.
 - [useSceneContext](../functions/useSceneContext.md) to access the context in functional components.
 - [SceneProvider](../functions/SceneProvider.md) to provide the context to the children components.
 - SceneRenderer To render the canvas of the scene.
 - [ModelLoader](../functions/ModelLoader.md) To load models on the scene.
 - [MaterialController](../functions/MaterialController.md) To control the materials of the models on the scene.
 - [useScene](../functions/useScene.md) to access SceneManager in functional components.
 - [SceneProviderProps](../interfaces/SceneProviderProps.md) for the properties of the scene provider.
 - SceneRendererProps For the properties of the scene rendering.
