[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / HDRIEvents

# Type Alias: HDRIEvents

```ts
type HDRIEvents = object;
```

Defined in: core/loaders/HDRILoader.ts:15

## Properties

### onProgress()?

```ts
optional onProgress: (progress) => void;
```

Defined in: core/loaders/HDRILoader.ts:16

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progress` | [`HDRIProgress`](HDRIProgress.md) |

#### Returns

`void`

***

### onLoaded()?

```ts
optional onLoaded: (texture, entry) => void;
```

Defined in: core/loaders/HDRILoader.ts:17

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `texture` | `THREE.Texture` |
| `entry` | [`ModelManifestEntry`](ModelManifestEntry.md) |

#### Returns

`void`

***

### onError()?

```ts
optional onError: (error, url) => void;
```

Defined in: core/loaders/HDRILoader.ts:18

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `url` | `string` |

#### Returns

`void`
