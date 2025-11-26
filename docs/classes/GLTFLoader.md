[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / GLTFLoader

# Class: GLTFLoader

Defined in: core/loaders/GLTFLoader.ts:20

## Constructors

### Constructor

```ts
new GLTFLoader(): GLTFLoader;
```

#### Returns

`GLTFLoader`

## Methods

### load()

```ts
static load(entry, options): Promise<Group<Object3DEventMap>>;
```

Defined in: core/loaders/GLTFLoader.ts:46

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md) |
| `options` | [`GLTFLoaderOptions`](../type-aliases/GLTFLoaderOptions.md) & [`GLTFLoaderEvents`](../type-aliases/GLTFLoaderEvents.md) |

#### Returns

`Promise`\<`Group`\<`Object3DEventMap`\>\>

***

### preload()

```ts
static preload(
   entries, 
   options, 
onProgress?): Promise<void>;
```

Defined in: core/loaders/GLTFLoader.ts:122

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md)[] |
| `options` | [`GLTFLoaderOptions`](../type-aliases/GLTFLoaderOptions.md) |
| `onProgress?` | (`completed`, `total`) => `void` |

#### Returns

`Promise`\<`void`\>

***

### invalidate()

```ts
static invalidate(id): Promise<void>;
```

Defined in: core/loaders/GLTFLoader.ts:141

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

***

### clearCache()

```ts
static clearCache(): Promise<void>;
```

Defined in: core/loaders/GLTFLoader.ts:145

#### Returns

`Promise`\<`void`\>
