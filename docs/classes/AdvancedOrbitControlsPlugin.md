[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AdvancedOrbitControlsPlugin

# Class: AdvancedOrbitControlsPlugin

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:4

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new AdvancedOrbitControlsPlugin(options): AdvancedOrbitControlsPlugin;
```

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:21

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

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:27

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

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:42

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

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:46

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

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:50

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

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:54

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

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:60

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AdvancedOrbitControls';
```

Defined in: core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts:5

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
