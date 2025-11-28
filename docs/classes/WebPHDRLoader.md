[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / WebPHDRLoader

# Class: WebPHDRLoader

Defined in: [core/loaders/WebPHDRLoader.ts:17](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L17)

Loader para WebP HDR (RGBM encoding)
Soporta .webp con metadatos HDR preservados
Ideal para environment maps ligeros y rápidos

## Constructors

### Constructor

```ts
new WebPHDRLoader(manager?): WebPHDRLoader;
```

Defined in: [core/loaders/WebPHDRLoader.ts:23](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L23)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `manager?` | `LoadingManager` |

#### Returns

`WebPHDRLoader`

## Methods

### setDataType()

```ts
setDataType(type): this;
```

Defined in: [core/loaders/WebPHDRLoader.ts:27](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L27)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `1015` \| `1016` |

#### Returns

`this`

***

### setExposure()

```ts
setExposure(exposure): this;
```

Defined in: [core/loaders/WebPHDRLoader.ts:32](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L32)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `exposure` | `number` |

#### Returns

`this`

***

### setPreserveHDR()

```ts
setPreserveHDR(preserve): this;
```

Defined in: [core/loaders/WebPHDRLoader.ts:37](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L37)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `preserve` | `boolean` |

#### Returns

`this`

***

### load()

```ts
load(
   url, 
   onLoad?, 
   onProgress?, 
   onError?): DataTexture;
```

Defined in: [core/loaders/WebPHDRLoader.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `onLoad?` | (`texture`, `data`) => `void` |
| `onProgress?` | (`event`) => `void` |
| `onError?` | (`event`) => `void` |

#### Returns

`DataTexture`

***

### parse()

```ts
parse(buffer): WebPHDRData;
```

Defined in: [core/loaders/WebPHDRLoader.ts:91](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L91)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buffer` | `ArrayBuffer` |

#### Returns

`WebPHDRData`

## Properties

### manager

```ts
manager: LoadingManager;
```

Defined in: [core/loaders/WebPHDRLoader.ts:18](https://github.com/ysordo/shared-3d/blob/main/src/core/loaders/WebPHDRLoader.ts#L18)
