[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / MeasurementToolPlugin

# Class: MeasurementToolPlugin

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:10](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L10)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new MeasurementToolPlugin(onMeasure?): MeasurementToolPlugin;
```

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:17](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `onMeasure?` | (`event`) => `void` |

#### Returns

`MeasurementToolPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:21](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L21)

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

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:98](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L98)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'MeasurementTool';
```

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L11)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
