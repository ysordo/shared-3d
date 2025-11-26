[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / useModel

# Function: useModel()

```ts
function useModel(entry, options): object;
```

Defined in: hooks/useModel.ts:12

## Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`ModelManifestEntry`](../type-aliases/ModelManifestEntry.md) \| `null` |
| `options` | `UseModelOptions` |

## Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `model` | `Group`\<`Object3DEventMap`\> \| `null` | hooks/useModel.ts:42 |
| `loading` | `boolean` | hooks/useModel.ts:42 |
| `error` | `Error` \| `null` | hooks/useModel.ts:42 |
| `load()` | () => `Promise`\<`Group`\<`Object3DEventMap`\>\> \| `null` | hooks/useModel.ts:42 |
