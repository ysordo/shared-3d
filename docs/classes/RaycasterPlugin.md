[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / RaycasterPlugin

# Class: RaycasterPlugin

Defined in: [src/core/orchestrator/plugins/RaycasterPlugin.ts:9](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/RaycasterPlugin.ts#L9)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new RaycasterPlugin(onEvent?): RaycasterPlugin;
```

Defined in: [src/core/orchestrator/plugins/RaycasterPlugin.ts:16](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/RaycasterPlugin.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `onEvent?` | (`event`) => `void` |

#### Returns

`RaycasterPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/RaycasterPlugin.ts:20](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/RaycasterPlugin.ts#L20)

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

Defined in: [src/core/orchestrator/plugins/RaycasterPlugin.ts:71](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/RaycasterPlugin.ts#L71)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'Raycaster';
```

Defined in: [src/core/orchestrator/plugins/RaycasterPlugin.ts:10](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/RaycasterPlugin.ts#L10)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
