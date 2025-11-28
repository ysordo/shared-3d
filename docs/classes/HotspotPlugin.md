[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / HotspotPlugin

# Class: HotspotPlugin

Defined in: [src/core/orchestrator/plugins/HotspotPlugin.ts:11](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/HotspotPlugin.ts#L11)

## Implements

- [`Plugin`](../interfaces/Plugin.md)

## Constructors

### Constructor

```ts
new HotspotPlugin(data): HotspotPlugin;
```

Defined in: [src/core/orchestrator/plugins/HotspotPlugin.ts:15](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/HotspotPlugin.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `HotspotData`[] |

#### Returns

`HotspotPlugin`

## Methods

### install()

```ts
install(__namedParameters): void;
```

Defined in: [src/core/orchestrator/plugins/HotspotPlugin.ts:17](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/HotspotPlugin.ts#L17)

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

Defined in: [src/core/orchestrator/plugins/HotspotPlugin.ts:36](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/HotspotPlugin.ts#L36)

#### Returns

`void`

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`dispose`](../interfaces/Plugin.md#dispose)

## Properties

### name

```ts
name: string = 'Hotspot';
```

Defined in: [src/core/orchestrator/plugins/HotspotPlugin.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/core/orchestrator/plugins/HotspotPlugin.ts#L12)

#### Implementation of

[`Plugin`](../interfaces/Plugin.md).[`name`](../interfaces/Plugin.md#name)
