[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / ObjectCache

# Class: ObjectCache

Defined in: [src/core/cache/ObjectCache.ts:7](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L7)

## Constructors

### Constructor

```ts
new ObjectCache(): ObjectCache;
```

#### Returns

`ObjectCache`

## Methods

### set()

```ts
static set<T>(
   id, 
   data, 
   hash, 
updatedAt): Promise<void>;
```

Defined in: [src/core/cache/ObjectCache.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L12)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `data` | `T` |
| `hash` | `string` |
| `updatedAt` | `number` |

#### Returns

`Promise`\<`void`\>

***

### get()

```ts
static get<T>(id): Promise<CacheEntry<T> | null>;
```

Defined in: [src/core/cache/ObjectCache.ts:29](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L29)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<[`CacheEntry`](../type-aliases/CacheEntry.md)\<`T`\> \| `null`\>

***

### has()

```ts
static has(id): Promise<boolean>;
```

Defined in: [src/core/cache/ObjectCache.ts:34](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L34)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### delete()

```ts
static delete(id): Promise<void>;
```

Defined in: [src/core/cache/ObjectCache.ts:40](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L40)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

***

### clearAll()

```ts
static clearAll(): Promise<void>;
```

Defined in: [src/core/cache/ObjectCache.ts:49](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L49)

#### Returns

`Promise`\<`void`\>
