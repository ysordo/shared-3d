[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AdvancedRaycasterPlugin

# Class: AdvancedRaycasterPlugin

Defined in: core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:195

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Accessors

### manager

#### Get Signature

```ts
get manager(): RaycasterManager;
```

Defined in: core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:237

##### Returns

`RaycasterManager`

## Constructors

### Constructor

```ts
new AdvancedRaycasterPlugin(model?, onEvent?): AdvancedRaycasterPlugin;
```

Defined in: core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:199

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

Defined in: core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:206

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

Defined in: core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:235

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'AdvancedRaycaster';
```

Defined in: core/orchestrator/plugins/AdvancedRaycasterPlugin.ts:196

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
