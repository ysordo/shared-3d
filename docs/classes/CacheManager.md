[**shared-3d**](../README.md)

***

[shared-3d](../globals.md) / CacheManager

# Class: CacheManager

Defined in: [core/CacheManager.ts:27](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/CacheManager.ts#L27)

CacheManager class to handle caching of 3D models using IndexedDB and Cache Storage API.
It provides methods to get, save, and clear cached models.
Models are cached for 7 days in IndexedDB and can be cleared after 30 days.
This class is designed to optimize the loading of 3D models by checking the cache before making network requests.

## Example

```tsx
import { CacheManager } from '@types/shared-3d';
const modelUrl = 'https://example.com/model.glb';
// // To get a model from the cache
const modelData = await CacheManager.getModel(modelUrl);
if (modelData) {
  // Use the cached model data
} else {
  // Load the model from the network
  const response = await fetch(modelUrl);
  const modelData = await response.arrayBuffer();
  // Save the model to the cache
  await CacheManager.saveModel(modelUrl, modelData);
}
// To clear expired models from the cache
await CacheManager.clearExpiredModels();
```

## Constructors

### Constructor

> **new CacheManager**(): `CacheManager`

#### Returns

`CacheManager`

## Methods

### clearExpiredModels()

> `static` **clearExpiredModels**(): `Promise`\<`void`\>

Defined in: [core/CacheManager.ts:91](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/CacheManager.ts#L91)

Clears expired models from the cache.
It checks all cached models in IndexedDB and removes those that are older than 30 days.
This helps to keep the cache clean and prevent it from growing indefinitely.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the cleanup is complete.

***

### getModel()

> `static` **getModel**(`url`): `Promise`\<`null` \| `ArrayBuffer`\>

Defined in: [core/CacheManager.ts:36](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/CacheManager.ts#L36)

Retrieves a 3D model from the cache.
It first checks IndexedDB for a cached model and then checks the Cache Storage API.
If the model is found in IndexedDB and is less than 7 days old, it returns the model data.
If not found, it checks the Cache Storage API and updates IndexedDB if the model is found there.

#### Parameters

##### url

`string`

The URL of the 3D model to retrieve.

#### Returns

`Promise`\<`null` \| `ArrayBuffer`\>

The cached model data or null if not found.

***

### saveModel()

> `static` **saveModel**(`url`, `data`): `Promise`\<`void`\>

Defined in: [core/CacheManager.ts:72](https://github.com/ysordo/shared-3d/blob/b750310afe185bd40b1dfb3440389c48aa09489c/src/core/CacheManager.ts#L72)

Saves a 3D model to the cache.
It saves the model data in IndexedDB and also in Cache Storage API.

#### Parameters

##### url

`string`

The URL of the 3D model to save.

##### data

`ArrayBuffer`

The model data to save.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the model is saved.
