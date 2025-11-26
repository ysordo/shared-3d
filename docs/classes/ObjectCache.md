[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / ObjectCache

# Class: ObjectCache

Defined in: core/cache/ObjectCache.ts:11

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
hash): Promise<void>;
```

Defined in: core/cache/ObjectCache.ts:17

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

#### Returns

`Promise`\<`void`\>

***

### get()

```ts
static get<T>(id): Promise<CacheEntry<T> | null>;
```

Defined in: core/cache/ObjectCache.ts:29

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

Defined in: core/cache/ObjectCache.ts:35

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

Defined in: core/cache/ObjectCache.ts:42

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

Defined in: core/cache/ObjectCache.ts:51

#### Returns

`Promise`\<`void`\>
