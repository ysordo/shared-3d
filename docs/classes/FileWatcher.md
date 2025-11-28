[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / FileWatcher

# Class: FileWatcher

Defined in: [src/core/cache/FileWatcher.ts:4](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/FileWatcher.ts#L4)

## Methods

### getInstance()

```ts
static getInstance(): FileWatcher;
```

Defined in: [src/core/cache/FileWatcher.ts:15](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/FileWatcher.ts#L15)

#### Returns

`FileWatcher`

***

### watch()

```ts
watch(manifest, onChange): void;
```

Defined in: [src/core/cache/FileWatcher.ts:22](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/FileWatcher.ts#L22)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `manifest` | [`ManifestEntry`](../type-aliases/ManifestEntry.md)[] |
| `onChange` | (`ids`) => `void` |

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: [src/core/cache/FileWatcher.ts:84](https://github.com/ysordo/shared-3d/blob/main/src/core/cache/FileWatcher.ts#L84)

#### Returns

`void`
