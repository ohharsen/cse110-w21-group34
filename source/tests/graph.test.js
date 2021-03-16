import * as Graph from '../scripts/util/graph';

describe('Graphing Y-axis 4 way splits', () => {
  test('Check when max value is less than 4', () => {
    let weekPomos = [3,2,2,0,2,2,2];
    let expectedSplits = [0, 1, 2, 3]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);

  });

  test('Check when max value is less than 11 and greater than 3', () => {
      let weekPomos = [1,2,3,4,3,4,1];
      let expectedSplits = [0, 1.7, 3.3, 5]
      expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);

    });

  test('Check when max value is greater than 10', () => {
    let weekPomos = [4,7,1,3,11,2,0];
    let expectedSplits = [0, 4.3, 8.7, 13]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);

  });

  test('Test with large numbers of tasks completed', () => {
    let weekPomos = [24,30,22,15,11,2,9];
    let expectedSplits = [0, 10.7, 21.3, 32]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);

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
    let expectedSplits = [0, 2.7, 5.3, 8]
    expect(Graph.calculateAxes(weekPomos)).toEqual(expectedSplits);
  
  });
});