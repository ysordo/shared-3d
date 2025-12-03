[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / HDRIEvents

# Type Alias: HDRIEvents

```ts
type HDRIEvents = object;
```

Defined in: [src/core/loaders/HDRILoader.ts:13](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L13)

## Properties

### onProgress()?

```ts
optional onProgress: (progress) => void;
```

Defined in: [src/core/loaders/HDRILoader.ts:14](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L14)

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

Defined in: [src/core/loaders/HDRILoader.ts:15](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `texture` | `THREE.Texture` |
| `entry` | [`ManifestEntry`](ManifestEntry.md) |

#### Returns

`void`

***

### onError()?

```ts
optional onError: (error, url) => void;
```

Defined in: [src/core/loaders/HDRILoader.ts:16](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `url` | `string` |

#### Returns

`void`
