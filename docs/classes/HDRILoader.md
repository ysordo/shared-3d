[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / HDRILoader

# Class: HDRILoader

Defined in: [src/core/loaders/HDRILoader.ts:19](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L19)

## Constructors

### Constructor

```ts
new HDRILoader(): HDRILoader;
```

#### Returns

`HDRILoader`

## Methods

### load()

```ts
static load(entry, events): Promise<Texture>;
```

Defined in: [src/core/loaders/HDRILoader.ts:26](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L26)

Carga un HDRI de forma inteligente (con caché + hash)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ManifestEntry`](../type-aliases/ManifestEntry.md) |
| `events` | [`HDRIEvents`](../type-aliases/HDRIEvents.md) |

#### Returns

`Promise`\<`Texture`\>

***

### preload()

```ts
static preload(entries, onProgress?): Promise<void>;
```

Defined in: [src/core/loaders/HDRILoader.ts:98](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L98)

Precarga múltiples HDRIs

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | [`ModelManifest`](../type-aliases/ModelManifest.md) |
| `onProgress?` | (`completed`, `total`) => `void` |

#### Returns

`Promise`\<`void`\>

***

### invalidate()

```ts
static invalidate(id): Promise<void>;
```

Defined in: [src/core/loaders/HDRILoader.ts:121](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L121)

Invalida caché de un HDRI específico

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>
