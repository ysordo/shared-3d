[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / SceneOrchestrator

# Class: SceneOrchestrator

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:16](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L16)

## Methods

### getInstance()

```ts
static getInstance(canvas?, config?): SceneOrchestrator;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:79](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L79)

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

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:88](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L88)

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

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:113](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L113)

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

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:136](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L136)

#### Returns

`void`

***

### setHDRI()

```ts
setHDRI(entry): Promise<Texture>;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:144](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L144)

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

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:161](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L161)

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:171](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L171)

#### Returns

`void`

***

### getActiveModel()

```ts
getActiveModel(): Group<Object3DEventMap> | null;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:197](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L197)

#### Returns

`Group`\<`Object3DEventMap`\> \| `null`

***

### getActiveHDRI()

```ts
getActiveHDRI(): Texture | null;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:201](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L201)

#### Returns

`Texture` \| `null`

## Properties

### scene

```ts
readonly scene: Scene;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:19](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L19)

***

### camera

```ts
readonly camera: PerspectiveCamera;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:20](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L20)

***

### renderer

```ts
readonly renderer: WebGLRenderer;
```

Defined in: [src/core/orchestrator/SceneOrchestrator.ts:21](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/SceneOrchestrator.ts#L21)
