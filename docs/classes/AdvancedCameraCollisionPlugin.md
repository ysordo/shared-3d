[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AdvancedCameraCollisionPlugin

# Class: AdvancedCameraCollisionPlugin

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:5](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L5)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new AdvancedCameraCollisionPlugin(distanceThreshold, pushBackOffset): AdvancedCameraCollisionPlugin;
```

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:9](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L9)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `distanceThreshold` | `number` | `0.6` |
| `pushBackOffset` | `number` | `0.1` |

#### Returns

`AdvancedCameraCollisionPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:14](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L14)

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

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:52](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L52)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AdvancedCameraCollisionPlugin';
```

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:6](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L6)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)

***

### distanceThreshold

```ts
readonly distanceThreshold: number = 0.6;
```

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:10](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L10)

***

### pushBackOffset

```ts
readonly pushBackOffset: number = 0.1;
```

Defined in: [src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts#L11)
