[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AutoLODSystemPlugin

# Class: AutoLODSystemPlugin

Defined in: [src/core/orchestrator/plugins/AutoLODSystemPlugin.ts:10](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L10)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new AutoLODSystemPlugin(config): AutoLODSystemPlugin;
```

Defined in: [src/core/orchestrator/plugins/AutoLODSystemPlugin.ts:15](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L15)

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

Defined in: [src/core/orchestrator/plugins/AutoLODSystemPlugin.ts:59](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L59)

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

Defined in: [src/core/orchestrator/plugins/AutoLODSystemPlugin.ts:99](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L99)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AutoLODSystem';
```

Defined in: [src/core/orchestrator/plugins/AutoLODSystemPlugin.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AutoLODSystemPlugin.ts#L11)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
