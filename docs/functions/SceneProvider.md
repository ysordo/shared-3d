[**shared-3d**](../README.md)

***

[shared-3d](../globals.md) / SceneProvider

# Function: SceneProvider()

> **SceneProvider**(`props`): `Element`

Defined in: [react/SceneProvider.tsx:82](https://github.com/ysordo/shared-3d/blob/79ab5be25ff066438316798d0d17f916ea9f1fbf/src/react/SceneProvider.tsx#L82)

SceneProvider component that initializes and provides the SceneManager context.

## Parameters

### props

[`SceneProviderProps`](../interfaces/SceneProviderProps.md)

Properties for the SceneProvider component.

## Returns

`Element`

A provider that wraps the SceneRenderer and provides the scene context.

## Example

```tsx
import { SceneProvider } from 'shared-3d';
import My3DComponent from './My3DComponent';
// Usage in a React component
// Wrap your 3D components with SceneProvider to provide the scene context
// and manage the 3D scene lifecycle.
// You can pass configuration options to the SceneProvider.
// For example, to enable antialiasing and shadows:
<SceneProvider config={{ antialias: true, shadows: true }}>
  <My3DComponent />
</SceneProvider>
```

## See

 - [SceneContext](../variables/SceneContext.md) for accessing the scene manager and canvas.
 - [SceneManager](../classes/SceneManager.md) for managing the 3D scene.
