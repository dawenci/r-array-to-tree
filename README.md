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

const array2 = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
]
const tree2 = arrayToTree(array, { dataField: null })
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

## options:

```typescript
{
  idField: string
  parentIdField: string
  childrenField: string
  parentField?: string
  dataField?: string
  orphansAsRoot: boolean  
  isRoot: (item: any) => boolean
  hasChild: (item: any) => boolean  
}
```

### idField

### parentIdField

### childrenField

### parentField

### dataField

### orphansAsRoot

### isRoot

### hasChild
