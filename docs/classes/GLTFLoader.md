[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / GLTFLoader

# Class: GLTFLoader

Defined in: [src/core/loaders/GLTFLoader.ts:16](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L16)

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

Defined in: [src/core/loaders/GLTFLoader.ts:41](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L41)

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

Defined in: [src/core/loaders/GLTFLoader.ts:114](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L114)

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

Defined in: [src/core/loaders/GLTFLoader.ts:133](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L133)

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

Defined in: [src/core/loaders/GLTFLoader.ts:137](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/GLTFLoader.ts#L137)

#### Returns

`Promise`\<`void`\>
