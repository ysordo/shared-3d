[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / GLTFLoaderEvents

# Type Alias: GLTFLoaderEvents

```ts
type GLTFLoaderEvents = object;
```

Defined in: core/loaders/GLTFLoader.ts:14

## Properties

### onProgress()?

```ts
optional onProgress: (p) => void | undefined;
```

Defined in: core/loaders/GLTFLoader.ts:15

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | \{ `loaded`: `number`; `total`: `number`; `percent`: `number`; `url`: `string`; \} |
| `p.loaded` | `number` |
| `p.total` | `number` |
| `p.percent` | `number` |
| `p.url` | `string` |

#### Returns

`void` \| `undefined`

***

### onLoaded()?

```ts
optional onLoaded: (obj, entry) => void | undefined;
```

Defined in: core/loaders/GLTFLoader.ts:16

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `THREE.Group` |
| `entry` | [`ModelManifestEntry`](ModelManifestEntry.md) |

#### Returns

`void` \| `undefined`

***

### onError()?

```ts
optional onError: (err, url) => void | undefined;
```

Defined in: core/loaders/GLTFLoader.ts:17

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |
| `url` | `string` |

#### Returns

`void` \| `undefined`
