[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / SceneOrchestrator

# Class: SceneOrchestrator

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:17](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L17)

## Methods

### getInstance()

```ts
static getInstance(canvas?, config?): SceneOrchestrator;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:80](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L80)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `canvas?` | `HTMLCanvasElement` |
| `config?` | [`SceneConfig`](../type-aliases/SceneConfig.md) |

#### Returns

`SceneOrchestrator`

***

### use()

```ts
use(plugin): this;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:89](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L89)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `plugin` | [`Plugin`](../interfaces/Plugin.md) |

#### Returns

`this`

***

### setModel()

```ts
setModel(entry, options?): Promise<Group<Object3DEventMap>>;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:114](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L114)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ManifestEntry`](../type-aliases/ManifestEntry.md) |
| `options?` | \{ `draco?`: `boolean`; \} |
| `options.draco?` | `boolean` |

#### Returns

`Promise`\<`Group`\<`Object3DEventMap`\>\>

***

### removeModel()

```ts
removeModel(): void;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:137](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L137)

#### Returns

`void`

***

### setHDRI()

```ts
setHDRI(entry): Promise<Texture>;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:145](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L145)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ManifestEntry`](../type-aliases/ManifestEntry.md) |

#### Returns

`Promise`\<`Texture`\>

***

### clearHDRI()

```ts
clearHDRI(): void;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:162](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L162)

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:172](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L172)

#### Returns

`void`

***

### getActiveModel()

```ts
getActiveModel(): Group<Object3DEventMap> | null;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:198](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L198)

#### Returns

`Group`\<`Object3DEventMap`\> \| `null`

***

### getActiveHDRI()

```ts
getActiveHDRI(): Texture | null;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:202](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L202)

#### Returns

`Texture` \| `null`

## Properties

### scene

```ts
readonly scene: Scene;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:20](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L20)

***

### camera

```ts
readonly camera: PerspectiveCamera;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:21](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L21)

***

### renderer

```ts
readonly renderer: WebGLRenderer;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:22](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L22)
