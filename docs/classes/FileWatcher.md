[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / FileWatcher

# Class: FileWatcher

Defined in: core/cache/FileWatcher.ts:8

Solo se usa en desarrollo (Vite, Webpack, Next.js, etc.)
Detecta cambios en archivos .glb/.gltf/.hdr y fuerza recarga del modelo

## Methods

### getInstance()

```ts
static getInstance(): FileWatcher;
```

Defined in: core/cache/FileWatcher.ts:20

#### Returns

`FileWatcher`

***

### watch()

```ts
watch(manifest, onChange): void;
```

Defined in: core/cache/FileWatcher.ts:27

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `manifest` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md)[] |
| `onChange` | (`ids`) => `void` |

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: core/cache/FileWatcher.ts:98

#### Returns

`void`
