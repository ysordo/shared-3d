[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / ValidationOptions

# Type Alias: ValidationOptions

```ts
type ValidationOptions = object;
```

Defined in: [src/core/cache/CacheValidator.ts:7](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/CacheValidator.ts#L7)

## Properties

### manifest

```ts
manifest: ManifestEntry[];
```

Defined in: [src/core/cache/CacheValidator.ts:8](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/CacheValidator.ts#L8)

***

### onProgress()?

```ts
optional onProgress: (progress, status) => void;
```

Defined in: [src/core/cache/CacheValidator.ts:9](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/CacheValidator.ts#L9)

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

Defined in: [src/core/cache/CacheValidator.ts:10](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/CacheValidator.ts#L10)

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

Defined in: [src/core/cache/CacheValidator.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/CacheValidator.ts#L11)
