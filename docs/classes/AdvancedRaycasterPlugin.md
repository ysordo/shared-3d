[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AdvancedRaycasterPlugin

# Class: AdvancedRaycasterPlugin

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:192](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L192)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Accessors

### manager

#### Get Signature

```ts
get manager(): RaycasterManager;
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:232](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L232)

##### Returns

`RaycasterManager`

## Constructors

### Constructor

```ts
new AdvancedRaycasterPlugin(model?, onEvent?): AdvancedRaycasterPlugin;
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:196](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L196)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `model?` | `Object3D`\<`Object3DEventMap`\> |
| `onEvent?` | (`event`) => `void` |

#### Returns

`AdvancedRaycasterPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:203](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L203)

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

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:230](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L230)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AdvancedRaycaster';
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:193](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L193)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
