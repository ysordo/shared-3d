[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / useModel

# Function: useModel()

```ts
function useModel(entry, options): object;
```

Defined in: [src/hooks/useModel.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L12)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ManifestEntry`](../type-aliases/ManifestEntry.md) \| `null` |
| `options` | `UseModelOptions` |

## Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `model` | `Group`\<`Object3DEventMap`\> \| `null` | [src/hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
| `loading` | `boolean` | [src/hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
| `error` | `Error` \| `null` | [src/hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
| `load()` | () => `Promise`\<`Group`\<`Object3DEventMap`\>\> \| `null` | [src/hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
