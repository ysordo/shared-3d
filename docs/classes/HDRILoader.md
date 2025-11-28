[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / HDRILoader

# Class: HDRILoader

Defined in: [core/loaders/HDRILoader.ts:20](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L20)

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

Defined in: [core/loaders/HDRILoader.ts:27](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L27)

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

Defined in: [core/loaders/HDRILoader.ts:99](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L99)

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

Defined in: [core/loaders/HDRILoader.ts:122](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/HDRILoader.ts#L122)

Invalida caché de un HDRI específico

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>
