[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / MaterialConfig

# Type Alias: MaterialConfig

```ts
type MaterialConfig = 
  | {
  name: string;
  type: "textured";
}
  | {
  name: string;
  type: "solid";
  color?: THREE.ColorRepresentation;
  metalness?: number;
  roughness?: number;
}
  | {
[key: string]: any;
  name: string;
  type: "wireframe";
  color?: THREE.ColorRepresentation;
  lineColor?: THREE.ColorRepresentation;
}
  | {
  name: string;
  type: "custom";
  factory: CustomMaterialFactory;
};
```

Defined in: react/controls/MaterialController.tsx:14
