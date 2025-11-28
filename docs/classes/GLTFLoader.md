[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / GLTFLoader

# Class: GLTFLoader

Defined in: [core/loaders/GLTFLoader.ts:17](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L17)

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

Defined in: [core/loaders/GLTFLoader.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ManifestEntry`](../type-aliases/ManifestEntry.md) |
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

Defined in: [core/loaders/GLTFLoader.ts:115](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L115)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | [`ModelManifest`](../type-aliases/ModelManifest.md) |
| `options` | [`GLTFLoaderOptions`](../type-aliases/GLTFLoaderOptions.md) |
| `onProgress?` | (`completed`, `total`) => `void` |

#### Returns

`Promise`\<`void`\>

***

### invalidate()

```ts
static invalidate(id): Promise<void>;
```

Defined in: [core/loaders/GLTFLoader.ts:134](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L134)

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

Defined in: [core/loaders/GLTFLoader.ts:138](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L138)

#### Returns

`Promise`\<`void`\>
