[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / DeepPartial

# Type Alias: DeepPartial\<T\>

```ts
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
```

Defined in: [lib/types.ts:38](https://github.com/ysordo/shared-3d/blob/main/src/lib/types.ts#L38)

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
