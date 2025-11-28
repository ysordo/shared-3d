[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AdvancedOrbitControlsPlugin

# Class: AdvancedOrbitControlsPlugin

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:4](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L4)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new AdvancedOrbitControlsPlugin(options): AdvancedOrbitControlsPlugin;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:20](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `Partial`\<*typeof* `this.config`\> |

#### Returns

`AdvancedOrbitControlsPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:26](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`PluginContext`](../type-aliases/PluginContext.md) |

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`install`](../interfaces/Plugin.md#install)

***

### setPanEnabled()

```ts
setPanEnabled(enabled): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:39](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L39)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `enabled` | `boolean` |

#### Returns

`void`

***

### setRotateEnabled()

```ts
setRotateEnabled(enabled): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:43](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `enabled` | `boolean` |

#### Returns

`void`

***

### setZoomEnabled()

```ts
setZoomEnabled(enabled): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:47](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `enabled` | `boolean` |

#### Returns

`void`

***

### setAllEnabled()

```ts
setAllEnabled(enabled): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:51](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `enabled` | `boolean` |

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:57](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L57)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AdvancedOrbitControls';
```

Defined in: [src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:5](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts#L5)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
