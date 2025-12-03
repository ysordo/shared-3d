[**shared-3d**](../README.md)

***

[shared-3d](../README.md) / ErrorBoundary3D

# Class: ErrorBoundary3D

Defined in: [src/react/components/ErrorBoundary3D.tsx:15](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L15)

## Extends

- `Component`\<`Props`, `State`\>

## Constructors

### Constructor

```ts
new ErrorBoundary3D(props): ErrorBoundary3D;
```

Defined in: node\_modules/@types/react/index.d.ts:949

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `Props` |

#### Returns

`ErrorBoundary3D`

#### Inherited from

```ts
Component<Props, State>.constructor
```

### Constructor

```ts
new ErrorBoundary3D(props, context): ErrorBoundary3D;
```

Defined in: node\_modules/@types/react/index.d.ts:957

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | `Props` |  |
| `context` | `any` | value of the parent [Context](https://react.dev/reference/react/Component#context) specified in `contextType`. |

#### Returns

`ErrorBoundary3D`

#### Inherited from

```ts
Component<Props, State>.constructor
```

## Methods

### getDerivedStateFromError()

```ts
static getDerivedStateFromError(): object;
```

Defined in: [src/react/components/ErrorBoundary3D.tsx:18](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L18)

#### Returns

`object`

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| `hasError` | `boolean` | `true` | [src/react/components/ErrorBoundary3D.tsx:19](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L19) |

***

### componentDidCatch()

```ts
componentDidCatch(error, errorInfo): void;
```

Defined in: [src/react/components/ErrorBoundary3D.tsx:22](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L22)

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `errorInfo` | `any` |

#### Returns

`void`

#### Overrides

```ts
Component.componentDidCatch
```

***

### render()

```ts
render(): 
  | string
  | number
  | bigint
  | boolean
  | Iterable<ReactNode, any, any>
  | Promise<AwaitedReactNode>
  | Element
  | null
  | undefined;
```

Defined in: [src/react/components/ErrorBoundary3D.tsx:26](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L26)

#### Returns

  \| `string`
  \| `number`
  \| `bigint`
  \| `boolean`
  \| `Iterable`\<`ReactNode`, `any`, `any`\>
  \| `Promise`\<`AwaitedReactNode`\>
  \| `Element`
  \| `null`
  \| `undefined`

#### Overrides

```ts
Component.render
```

## Properties

### state

```ts
state: object;
```

Defined in: [src/react/components/ErrorBoundary3D.tsx:16](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L16)

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| `hasError` | `boolean` | `false` | [src/react/components/ErrorBoundary3D.tsx:16](https://github.com/ysordo/shared-3d/blob/main/src/react/components/ErrorBoundary3D.tsx#L16) |

#### Overrides

```ts
Component.state
```
