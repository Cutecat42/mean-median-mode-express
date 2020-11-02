const { findMean, findMedian, findMode } = require("./helpers");

describe('Make sure findMean function works', function () {
    let nums;

    beforeEach(function () {
      nums = "1,2,3,4"
      noNums = NaN
      next = () => {
          return "error"
      }
    });

    test('If nums are all nums and is defined', function () {
    let x = findMean(nums,next)
    expect(x).toEqual({response: {
        operation: 'mean',
        value: 2.5
      }});
  });
    test('If mean is NaN', function () {
    let x = findMean(noNums,next)
    expect(x).toEqual('error');
  });
  
});

describe('Make sure findMedian function works', function () {
    let nums;

    beforeEach(function () {
      nums = "1,2,3,4"
      noNums = NaN
      next = () => {
          return "error"
      }
    });

    test('If nums are all nums and is defined', function () {
    let x = findMedian(nums,next)
    expect(x).toEqual({response: {
        operation: 'median',
        value: 2.5
      }});
  });
    test('If median is NaN', function () {
    let x = findMedian(noNums,next)
    expect(x).toEqual('error');
  });
  
});

describe('Make sure findMode function works', function () {
    let nums;

    beforeEach(function () {
      nums = "1,2,3,4"
      noNums = NaN
      next = () => {
          return "error"
      }
    });

    test('If nums are all nums and is defined', function () {
    let x = findMode(nums,next)
    expect(x).toEqual({response: {
        operation: 'mode',
        value: "4"
      }});
  });
    test('If mode is NaN', function () {
    let x = findMode(noNums,next)
    expect(x).toEqual('error');
  });
  
});
