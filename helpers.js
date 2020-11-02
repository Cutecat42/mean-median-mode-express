const ExpressError = require("./expressError")

function findMean(nums,next) {
    try {
        nums = nums.split(",");
        let avg = 0;
        for (let i = 0; i < nums.length; i++) {
            avg += Number(nums[i]);
        }

        if (isNaN(avg/nums.length)) throw new ExpressError("Nums must be all numbers", 400);

        return {response: {
            operation: "mean",
            value: avg/nums.length
          }};
    } 
    catch (err) {
        return next(err);
    }
}

function findMedian(nums,next) {
    try {
        nums = nums.split(",").sort((a, b) => 
            a - b
        );
        let median;
        if (nums.length % 2 !== 0) {
            // odd
            let idx = Math.round(nums.length / 2);
            median = Number(nums[idx - 1]);
        }
        else {
            // even
            let idx = nums.length / 2;
            median = (Number(nums[idx - 1]) + Number(nums[idx])) / 2
        }

        for (i = 0; i < nums.length; i++) {
            if (isNaN(Number(nums[i]))) throw new ExpressError("Nums must be all numbers", 400);   
        }

        return {response: {
            operation: "median",
            value: median
          }};
    } 
    catch (err) {
        return next(err);
    }
}

function findMode(nums,next) {
    try {
        nums = nums.split(",")
        let mode = nums.sort((a,b) =>
            nums.filter(v => v===a).length
            - nums.filter(v => v===b).length
            ).pop();

        if (isNaN(mode)) throw new ExpressError("Nums must be all numbers", 400);      
        // if (req.query.nums.length < 1) throw new ExpressError("Nums are required", 400);

        return {response: {
            operation: "mode",
            value: mode
          }};
    } 
    catch (err) {
        return next(err);
    }
}

module.exports = {findMean, findMedian, findMode};