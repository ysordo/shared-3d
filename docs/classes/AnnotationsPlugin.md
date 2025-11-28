[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / AnnotationsPlugin

# Class: AnnotationsPlugin

Defined in: [src/core/orchestrator/plugins/AnnotationsPlugin.ts:13](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AnnotationsPlugin.ts#L13)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new AnnotationsPlugin(data): AnnotationsPlugin;
```

Defined in: [src/core/orchestrator/plugins/AnnotationsPlugin.ts:19](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AnnotationsPlugin.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `AnnotationData`[] |

#### Returns

`AnnotationsPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/AnnotationsPlugin.ts:21](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AnnotationsPlugin.ts#L21)

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

Defined in: [src/core/orchestrator/plugins/AnnotationsPlugin.ts:112](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AnnotationsPlugin.ts#L112)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'Annotations';
```

Defined in: [src/core/orchestrator/plugins/AnnotationsPlugin.ts:14](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/AnnotationsPlugin.ts#L14)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
