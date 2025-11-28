[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / MeasurementToolPlugin

# Class: MeasurementToolPlugin

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L11)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new MeasurementToolPlugin(onMeasure?): MeasurementToolPlugin;
```

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:18](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L18)

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

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:22](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L22)

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

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:99](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L99)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'MeasurementTool';
```

Defined in: [src/core/orchestrator/plugins/MeasurementToolPlugin.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/MeasurementToolPlugin.ts#L12)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
