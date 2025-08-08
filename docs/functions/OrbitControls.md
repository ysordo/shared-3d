[**shared-3d**](../README.md)

***

[shared-3d](../globals.md) / OrbitControls

# Function: OrbitControls()

> **OrbitControls**(`props`): `null`

Defined in: [react/OrbitControls.ts:34](https://github.com/ysordo/shared-3d/blob/aa08df17a8d7b07be13caf0e053d835d053c41db/src/react/OrbitControls.ts#L34)

Component to manage orbit controls for a 3D scene.
It sets up controls based on the active model and allows customization of control options.

## Parameters

### props

`OrbitControlsProps`

Component properties

## Returns

`null`

This component does not render anything directly, it sets up controls in the scene.

## Example

```ts
<OrbitControls enableRotate={true} enableZoom={true} enablePan={false} />
```

## Description

The OrbitControls component sets up Three.js orbit controls for the active model in the scene.
It allows users to rotate, zoom, and pan the camera around the model based on the provided options.
The controls are automatically cleaned up when the component is unmounted or when the active model changes.
This component is useful for providing interactive camera controls in 3D applications.
