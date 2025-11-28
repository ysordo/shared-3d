[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / GLTFLoaderEvents

# Type Alias: GLTFLoaderEvents

```ts
type GLTFLoaderEvents = object;
```

Defined in: [src/core/loaders/GLTFLoader.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L11)

## Properties

### onProgress()?

```ts
optional onProgress: (p) => void | undefined;
```

Defined in: [src/core/loaders/GLTFLoader.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L12)

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

Defined in: [src/core/loaders/GLTFLoader.ts:13](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L13)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `THREE.Group` |
| `entry` | [`ManifestEntry`](ManifestEntry.md) |

#### Returns

`void` \| `undefined`

***

### onError()?

```ts
optional onError: (err, url) => void | undefined;
```

Defined in: [src/core/loaders/GLTFLoader.ts:14](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L14)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |
| `url` | `string` |

#### Returns

`void` \| `undefined`
