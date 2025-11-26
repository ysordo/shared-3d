[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / RaycasterPlugin

# Class: RaycasterPlugin

Defined in: core/orchestrator/plugins/RaycasterPlugin.ts:9

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new RaycasterPlugin(onEvent?): RaycasterPlugin;
```

Defined in: core/orchestrator/plugins/RaycasterPlugin.ts:16

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

Defined in: core/orchestrator/plugins/RaycasterPlugin.ts:20

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

Defined in: core/orchestrator/plugins/RaycasterPlugin.ts:72

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'Raycaster';
```

Defined in: core/orchestrator/plugins/RaycasterPlugin.ts:10

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
