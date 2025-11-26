[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / HDRILoader

# Class: HDRILoader

Defined in: core/loaders/HDRILoader.ts:21

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

Defined in: core/loaders/HDRILoader.ts:28

Carga un HDRI de forma inteligente (con caché + hash)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md) |
| `events` | [`HDRIEvents`](../type-aliases/HDRIEvents.md) |

#### Returns

`Promise`\<`Texture`\>

***

### preload()

```ts
static preload(entries, onProgress?): Promise<void>;
```

Defined in: core/loaders/HDRILoader.ts:105

Precarga múltiples HDRIs

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md)[] |
| `onProgress?` | (`completed`, `total`) => `void` |

#### Returns

`Promise`\<`void`\>

***

### invalidate()

```ts
static invalidate(id): Promise<void>;
```

Defined in: core/loaders/HDRILoader.ts:128

Invalida caché de un HDRI específico

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>
