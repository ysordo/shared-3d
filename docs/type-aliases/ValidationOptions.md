[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / ValidationOptions

# Type Alias: ValidationOptions

```ts
type ValidationOptions = object;
```

Defined in: core/cache/CacheValidator.ts:7

## Properties

### manifest

```ts
manifest: ModelManifestEntry[];
```

Defined in: core/cache/CacheValidator.ts:8

***

### onProgress()?

```ts
optional onProgress: (progress, status) => void;
```

Defined in: core/cache/CacheValidator.ts:9

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progress` | `number` |
| `status` | `string` |

#### Returns

`void`

***

### onComplete()?

```ts
optional onComplete: (report) => void;
```

Defined in: core/cache/CacheValidator.ts:10

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `report` | [`CacheReport`](CacheReport.md) |

#### Returns

`void`

***

### forceUpdate?

```ts
optional forceUpdate: boolean;
```

Defined in: core/cache/CacheValidator.ts:11
