[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / SceneOrchestrator

# Class: SceneOrchestrator

Defined in: core/orchestrator/SceneOrchestrator.ts:18

## Methods

### getInstance()

```ts
static getInstance(canvas?, config?): SceneOrchestrator;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:89

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

Defined in: core/orchestrator/SceneOrchestrator.ts:98

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

Defined in: core/orchestrator/SceneOrchestrator.ts:123

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md) |
| `options?` | \{ `draco?`: `boolean`; \} |
| `options.draco?` | `boolean` |

#### Returns

`Promise`\<`Group`\<`Object3DEventMap`\>\>

***

### removeModel()

```ts
removeModel(): void;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:147

#### Returns

`void`

***

### setHDRI()

```ts
setHDRI(entry): Promise<Texture>;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:155

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md) |

#### Returns

`Promise`\<`Texture`\>

***

### clearHDRI()

```ts
clearHDRI(): void;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:172

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:182

#### Returns

`void`

***

### getActiveModel()

```ts
getActiveModel(): Group<Object3DEventMap> | null;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:214

#### Returns

`Group`\<`Object3DEventMap`\> \| `null`

***

### getActiveHDRI()

```ts
getActiveHDRI(): Texture | null;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:218

#### Returns

`Texture` \| `null`

## Properties

### scene

```ts
readonly scene: Scene;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:22

***

### camera

```ts
readonly camera: PerspectiveCamera;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:23

***

### renderer

```ts
readonly renderer: WebGLRenderer;
```

Defined in: core/orchestrator/SceneOrchestrator.ts:24
