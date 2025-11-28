[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / useModel

# Function: useModel()

```ts
function useModel(entry, options): object;
```

Defined in: [hooks/useModel.ts:12](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L12)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ManifestEntry`](../type-aliases/ManifestEntry.md) \| `null` |
| `options` | `UseModelOptions` |

## Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `model` | `Group`\<`Object3DEventMap`\> \| `null` | [hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
| `loading` | `boolean` | [hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
| `error` | `Error` \| `null` | [hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
| `load()` | () => `Promise`\<`Group`\<`Object3DEventMap`\>\> \| `null` | [hooks/useModel.ts:42](https://github.com/ysordo/shared-3d/blob/main/src/hooks/useModel.ts#L42) |
