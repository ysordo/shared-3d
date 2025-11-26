[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / PostProcessingPlugin

# Class: PostProcessingPlugin

Defined in: core/orchestrator/plugins/PostProcessingPlugin.ts:7

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new PostProcessingPlugin(options): PostProcessingPlugin;
```

Defined in: core/orchestrator/plugins/PostProcessingPlugin.ts:12

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | \{ `strength`: `number`; `radius`: `number`; `threshold`: `number`; \} |
| `options.strength` | `number` |
| `options.radius` | `number` |
| `options.threshold` | `number` |

#### Returns

`PostProcessingPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: core/orchestrator/plugins/PostProcessingPlugin.ts:16

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`PluginContext`](../type-aliases/PluginContext.md) |

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`install`](../interfaces/Plugin.md#install)

***

### setBloom()

```ts
setBloom(strength): void;
```

Defined in: core/orchestrator/plugins/PostProcessingPlugin.ts:51

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `strength` | `number` |

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: core/orchestrator/plugins/PostProcessingPlugin.ts:55

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'PostProcessing';
```

Defined in: core/orchestrator/plugins/PostProcessingPlugin.ts:8

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
