[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / LODSystemPlugin

# Class: LODSystemPlugin

Defined in: [src/core/orchestrator/plugins/LODSystemPlugin.ts:14](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L14)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new LODSystemPlugin(config): LODSystemPlugin;
```

Defined in: [src/core/orchestrator/plugins/LODSystemPlugin.ts:19](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L19)

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

Defined in: [src/core/orchestrator/plugins/LODSystemPlugin.ts:21](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L21)

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

Defined in: [src/core/orchestrator/plugins/LODSystemPlugin.ts:72](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L72)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'LODSystem';
```

Defined in: [src/core/orchestrator/plugins/LODSystemPlugin.ts:15](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/LODSystemPlugin.ts#L15)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
