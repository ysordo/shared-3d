[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / RaycasterEvent

# Type Alias: RaycasterEvent

```ts
type RaycasterEvent = 
  | {
  type: "click";
  object: THREE.Object3D;
  point: THREE.Vector3;
}
  | {
  type: "hover";
  object: THREE.Object3D;
  point: THREE.Vector3;
}
  | {
  type: "leave";
  object: THREE.Object3D;
};
```

Defined in: core/orchestrator/plugins/RaycasterPlugin.ts:4
