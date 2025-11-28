[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / LODSystemPlugin

# Class: LODSystemPlugin

Defined in: [core/orchestrator/plugins/LODSystemPlugin.ts:15](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L15)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new LODSystemPlugin(config): LODSystemPlugin;
```

Defined in: [core/orchestrator/plugins/LODSystemPlugin.ts:20](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `LODConfig`[] |

#### Returns

`LODSystemPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [core/orchestrator/plugins/LODSystemPlugin.ts:22](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L22)

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

Defined in: [core/orchestrator/plugins/LODSystemPlugin.ts:73](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L73)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'LODSystem';
```

Defined in: [core/orchestrator/plugins/LODSystemPlugin.ts:16](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L16)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
