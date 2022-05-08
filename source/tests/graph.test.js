import * as Graph from '../scripts/util/graph';

describe('Graphing Y-axis 4 way splits', () => {
  test('Check when max value is less than 3', () => {
    let weekPomos = [1,2,2,0,2,2,2];
    let expectedSplits = [0, 1, 2, 3]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);
  });

  test('Check when max value is less than 11 and greater than 2', () => {
      let weekPomos = [1,2,3,3,3,0,1];
      let expectedSplits = [0, 2, 4, 6]
      expect(Graph.calculateAxes( weekPomos )).toEqual(expectedSplits);
    });

  test('Check when max value is greater than 10', () => {
    let weekPomos = [4,7,1,3,11,2,0];
    let expectedSplits = [0, 5, 10, 15]
    expect(Graph.calculateAxes( weekPomos )).toEqual(expectedSplits);
  });

  test('Test with large numbers of tasks completed', () => {
    let weekPomos = [24,30,22,15,11,2,9];
    let expectedSplits = [0, 11, 22, 33]
    expect(Graph.calculateAxes( weekPomos )).toEqual(expectedSplits);
  });

  test('Test when there have been no recorded tasks in a week', () => {
    let weekPomos = [0,0,0,0,0,0,0];
    let expectedSplits = [0, 1, 2, 3]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);
  });

  test('Check when only one day has completed tasks', () => {
    let weekPomos = [5,0,0,0,0,0,0];
    let expectedSplits = [0, 2, 4, 6]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);
  });

  test('Check when multiple, but not all days, have completed tasks', () => {
    let weekPomos = [5,4,2,7,0,0,0];
    let expectedSplits = [0, 3, 6, 9]
    expect(Graph.calculateAxes( weekPomos )).toEqual( expectedSplits);
  });

  test('Check when multiple, but not all consecutive days, have completed tasks', () => {
    let weekPomos = [5,0,0,0,0,15,0];
    let expectedSplits = [0, 6, 12, 18]
    expect(Graph.calculateAxes( weekPomos )).toEqual( expectedSplits);
  });

  test('Check when all days have same amount of completed tasks', () => {
    let weekPomos = [15,15,15,15,15,15,15];
    let expectedSplits = [0, 6, 12, 18]
    expect(Graph.calculateAxes( weekPomos )).toEqual( expectedSplits);
  });
});