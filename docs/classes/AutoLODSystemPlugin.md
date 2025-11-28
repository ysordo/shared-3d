[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AutoLODSystemPlugin

# Class: AutoLODSystemPlugin

Defined in: [core/orchestrator/plugins/AutoLODSystemPlugin.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L11)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new AutoLODSystemPlugin(config): AutoLODSystemPlugin;
```

Defined in: [core/orchestrator/plugins/AutoLODSystemPlugin.ts:16](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `AutoLODConfig` |

#### Returns

`AutoLODSystemPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [core/orchestrator/plugins/AutoLODSystemPlugin.ts:60](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L60)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`PluginContext`](../type-aliases/PluginContext.md) |

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`install`](../interfaces/Plugin.md#install)

***

### dispose()

```ts
dispose(): void;
```

Defined in: [core/orchestrator/plugins/AutoLODSystemPlugin.ts:100](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L100)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AutoLODSystem';
```

Defined in: [core/orchestrator/plugins/AutoLODSystemPlugin.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L12)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
