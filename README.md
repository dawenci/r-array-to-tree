# r-array-to-tree

## Installation

```
npm install r-array-to-tree --save
```

## Usage

```typescript
import { arrayToTree } from 'r-array-to-tree'

const array = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
]

const tree = arrayToTree(array)
// tree:
// [
//   {
//     data: {
//       id: 1,
//       parentId: null
//     },
//     children: [
//       {
//         data: { id: 2, parentId: 1 }
//       }
//     ]
//   }
// ]
```

## options:

```typescript
{
  idField?: string
  parentIdField?: string
  childrenField?: string
  parentField?: string | boolean
  dataField?: string | boolean
  orphansAsRoot?: boolean
  isRoot?: (item: any) => boolean
  hasChild?: (item: any) => boolean
}
```

### options.idField

The default value is `'id'`

```typescript
const array = [
  { itemId: 1, parentId: null },
  { itemId: 2, parentId: 1 },
]
const options = { idField: 'itemId' }
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     data: { itemId: 1, parentId: null },
//     children: [
//       {
//         data: { itemId: 2, parentId: 1 }
//       },
//     ]
//   }
// ]
```

### options.parentIdField

The default value is `'parentId'`.

```typescript
const array = [
  { id: 1, pid: null },
  { id: 2, pid: 1 },
]
const options = { parentIdField: 'pid' }
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     data: { id: 1, pid: null },
//     children: [
//       {
//         data: { id: 2, pid: 1 }
//       },
//     ]
//   }
// ]
```

### options.childrenField

The default value is `'children'`.

```typescript
const array = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
]
const options = { childrenField: 'nodes' }
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     data: { id: 1, parentId: null },
//     nodes: [
//       {
//         data: { id: 2, parentId: 1 }
//       },
//     ]
//   }
// ]
```

### options.parentField

The default value is `undefined`

```typescript
const array = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
]

const options = { parentField: true }
// OR { parentField: 'parent' }
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     data: { id: 1, parentId: null },
//     children: [
//       {
//         data: { id: 2, parentId: 1 },
//         parent: <Point_to_parent>
//       },
//     ]
//   }
// ]
```

### options.dataField

The default value is `'data'`

```typescript
const array = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
]
const options = { dataField: 'value' }
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     value: { id: 1, parentId: null },
//     children: [
//       {
//         value: { id: 2, parentId: 1 },
//       },
//     ]
//   }
// ]

const array2 = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
]
const options2 = { dataField: false }
const tree2 = arrayToTree(array, options)

// tree2:
// [
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       {
//         id: 2,
//         parentId: 1
//       }
//     ]
//   }
// ]

```
> Warn:
>
> If `dataField` is `false` or `''` (empty string), the `arrayToTree` function mutates array.


### options.orphansAsRoot

The default value is `false`

```typescript

const array = [
  { id: 1, parentId: null },
  { id: 2, parentId: 3 },
]
const tree1 = arrayToTree(array)
const tree2 = arrayToTree(array, { orphansAsRoot: true })

// tree1:
// [
//   {
//     data: { id: 1, parentId: null }
//   }
// ]

// tree2:
// [
//   {
//     data: { id: 1, parentId: null }
//   },
//   {
//     data: { id: 2, parentId: 3 }
//   },
// ]
```

### options.isRoot

The default value is `(item) => item[options.parentIdField] == null`

```typescript
const array = [
  { id: 1, parentId: 0 },
  { id: 2, parentId: 1 },
]
const options = {
  isRoot: item => item.parentId === 0
}
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     data: { id: 1, parentId: 0 },
//     children: [
//       {
//         data: { id: 2, parentId: 1 },
//       },
//     ]
//   }
// ]
```

### options.hasChild

The default value is `undefined`

```typescript
const array = [
  { id: 1, parentId: null, childCount: 1 },
  { id: 2, parentId: 1, childCount: 0 },
]
const options = {
  hasChild: (item) => item.childCount > 0
}
const tree = arrayToTree(array, options)

// tree:
// [
//   {
//     data: { id: 1, parentId: null, childCount: 1 },
//     children: [
//       {
//         data: { id: 2, parentId: 1, childCount: 0 },
//       },
//     ]
//   }
// ]
```
