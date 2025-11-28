[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / ObjectCache

# Class: ObjectCache

Defined in: [core/cache/ObjectCache.ts:8](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L8)

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

Defined in: [core/cache/ObjectCache.ts:13](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L13)

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

Defined in: [core/cache/ObjectCache.ts:30](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L30)

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

Defined in: [core/cache/ObjectCache.ts:35](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L35)

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

Defined in: [core/cache/ObjectCache.ts:41](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L41)

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

Defined in: [core/cache/ObjectCache.ts:50](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/ObjectCache.ts#L50)

#### Returns

`Promise`\<`void`\>
