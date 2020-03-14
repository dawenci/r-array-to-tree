import { arrayToTree } from '../../src'

describe('arrayToTree', () => {
  it('arrayToTree(array)', () => {
    expect(arrayToTree()).toEqual([])
    expect(arrayToTree([])).toEqual([])
    expect(arrayToTree([{ id: null }])).toEqual([])

    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 1 }
    const item3 = { id: 3, parentId: 1 }
    const item4 = { id: 4, parentId: 2 }
    const item5 = { id: 5, parentId: 2 }

    expect(arrayToTree([item1, item2, item3, item4, item5])).toEqual([
      { data: item1, children: [{ data: item2, children: [{ data: item4 }, { data: item5 }] }, { data: item3 }] },
    ])
    expect(arrayToTree([item5, item4, item3, item2, item1])).toEqual([
      { data: item1, children: [{ data: item3 }, { data: item2, children: [{ data: item5 }, { data: item4 }] }] },
    ])
    expect(arrayToTree([item3, item2, item1])).toEqual([{ data: item1, children: [{ data: item3 }, { data: item2 }] }])
  })

  it('options.idField', () => {
    const item1 = { myId: 1 }
    const item2 = { myId: 2, parentId: 1 }
    const tree = arrayToTree([item1, item2], { idField: 'myId' })
    const expected = [{ data: item1, children: [{ data: item2 }] }]
    expect(tree).toEqual(expected)

    const tree2 = arrayToTree([item1, item2], { idField: '  ' })
    expect(tree2).toEqual([])
  })

  it('options.parentIdField', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, myPid: 1 }
    const options = {
      parentIdField: 'myPid',
    }
    const tree = arrayToTree([item1, item2], options)
    const expected = [{ data: item1, children: [{ data: item2 }] }]
    expect(tree).toEqual(expected)

    const tree2 = arrayToTree([item1, item2], { parentIdField: '  ' })
    expect(tree2).toEqual([{ data: item1 }, { data: item2 }])
  })

  it('options.childrenField', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 1 }
    const options = {
      childrenField: 'myChildren',
    }
    const tree = arrayToTree([item1, item2], options)
    const expected = [{ data: item1, myChildren: [{ data: item2 }] }]
    expect(tree).toEqual(expected)

    const tree2 = arrayToTree([item1, item2], { childrenField: '  ' })
    expect(tree2).toEqual([{ data: item1, children: [{ data: item2 }] }])
  })

  it('options.parentField', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 1 }

    const tree1 = arrayToTree([item1, item2], { parentField: 'parent' })
    expect(tree1[0]).toEqual(tree1[0].children[0].parent)

    const tree2 = arrayToTree([item2, item1], { parentField: 'parent' })
    expect(tree2[0]).toEqual(tree2[0].children[0].parent)

    const tree3 = arrayToTree([item1, item2], { parentField: '  ' })
    expect(tree3).toEqual([{ data: item1, children: [{ data: item2 }] }])

    const tree4 = arrayToTree([item1, item2], { parentField: false })
    expect(tree4).toEqual([{ data: item1, children: [{ data: item2 }] }])

    const tree5 = arrayToTree([item1, item2], { parentField: true })
    expect(tree5[0]).toEqual(tree1[0].children[0].parent)
  })

  it('options.dataField', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 1 }

    expect(arrayToTree([item1, item2], { dataField: true })).toEqual([{ data: item1, children: [{ data: item2 }] }])

    expect(arrayToTree([{ ...item1 }, { ...item2 }], { dataField: false })).toEqual([{ ...item1, children: [item2] }])

    expect(arrayToTree([item1, item2], { dataField: 'value' })).toEqual([
      { value: item1, children: [{ value: item2 }] },
    ])

    expect(arrayToTree([{ ...item1 }, { ...item2 }], { dataField: ' ' })).toEqual([{ ...item1, children: [item2] }])
  })

  it('options.orphansAsRoot', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 3 }
    const options = { orphansAsRoot: true }

    const tree = arrayToTree([item1, item2], options)
    const expected = [{ data: item1 }, { data: item2 }]
    expect(tree).toEqual(expected)

    const tree2 = arrayToTree([item1, item2], { orphansAsRoot: false })
    const expected2 = [{ data: item1 }]
    expect(tree2).toEqual(expected2)

    const item3 = { id: 1 }
    const item4 = { id: 2, parentId: 1 }
    const tree3 = arrayToTree([item3, item4], { hasChild: () => false, orphansAsRoot: true })
    const expected3 = [{ data: item3 }, { data: item4 }]
    expect(tree3).toEqual(expected3)
  })

  it('options.isRoot', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 1 }

    const tree1 = arrayToTree([item1, item2], { isRoot: () => false })
    const expected1: any[] = []
    expect(tree1).toEqual(expected1)

    const tree2 = arrayToTree([item1, item2], { isRoot: () => true })
    const expected2 = [{ data: item1 }, { data: item2 }]
    expect(tree2).toEqual(expected2)
  })

  it('options.hasChild', () => {
    const item1 = { id: 1 }
    const item2 = { id: 2, parentId: 1 }

    const tree1 = arrayToTree([item1, item2], { hasChild: () => true })
    expect(tree1).toEqual([{ data: item1, children: [{ data: item2 }] }])

    const tree2 = arrayToTree([item1, item2], { hasChild: () => false })
    expect(tree2).toEqual([{ data: item1 }])
  })
})
