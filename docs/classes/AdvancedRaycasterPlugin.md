[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AdvancedRaycasterPlugin

# Class: AdvancedRaycasterPlugin

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:193](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L193)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Accessors

### manager

#### Get Signature

```ts
get manager(): RaycasterManager;
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:233](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L233)

##### Returns

`RaycasterManager`

## Constructors

### Constructor

```ts
new AdvancedRaycasterPlugin(model?, onEvent?): AdvancedRaycasterPlugin;
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:197](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L197)

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

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:204](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L204)

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

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:231](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L231)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AdvancedRaycaster';
```

Defined in: [src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:194](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts#L194)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
