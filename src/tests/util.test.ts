import { reorderArray } from '../util';

const originalArray = [1,2,3,4];

// data events emitted by dragging and dropping UI elements
const event1 = {newIndex: 1, oldIndex: 0};
const event2 = {newIndex: 2, oldIndex: 0};
const event3 = {newIndex: 3, oldIndex: 0};
const event4 = {newIndex: 1, oldIndex: 2};
const event5 = {newIndex: 0, oldIndex: 3};


describe('reorderArray', () => {
  test('move down 1', () => {
    expect(
      reorderArray(event1, originalArray)
    ).toEqual([2,1,3,4]);
  });

  test('move down 2', () => {
    expect(
      reorderArray(event2, originalArray)
    ).toEqual([2,3,1,4]);
  });

  test('move down 2', () => {
    expect(
      reorderArray(event3, originalArray)
    ).toEqual([2,3,4,1]);
  });


  test('move up one', () => {
    expect(
      reorderArray(event4, originalArray)
    ).toEqual([1,3,2,4]);
  });

  test('move from bottom to top', () => {
    expect(
      reorderArray(event5, originalArray)
    ).toEqual([4,1,2,3]);
  });
});
