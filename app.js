const express = require('express');
const ExpressError = require("./expressError")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res, next) {
    try {
        let nums = req.query.nums.split(",");
        let avg = 0;
        for (let i = 0; i < nums.length; i++) {
            avg += Number(nums[i]);
        }

        if (isNaN(avg/nums.length)) throw new ExpressError("Nums must be all numbers", 404);
        if (req.query.nums.length < 1) throw new ExpressError("Nums are required", 404);

        return res.json({response: {
            operation: "mean",
            value: avg/nums.length
          }});
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/median', function(req, res, next) {
    try {
        let nums = req.query.nums.split(",").sort((a, b) => 
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
            if (isNaN(Number(nums[i]))) throw new ExpressError("Nums must be all numbers", 404);   
        }
        if (req.query.nums.length < 1) throw new ExpressError("Nums are required", 404);

        return res.json({response: {
            operation: "median",
            value: median
          }});
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/mode', function(req, res, next) {
    try {
        let nums = req.query.nums.split(",")
        let mode = nums.sort((a,b) =>
            nums.filter(v => v===a).length
            - nums.filter(v => v===b).length
            ).pop();

        if (isNaN(mode)) throw new ExpressError("Nums must be all numbers", 404);      
        if (req.query.nums.length < 1) throw new ExpressError("Nums are required", 404);

        return res.json({response: {
            operation: "mode",
            value: mode
          }});
    } 
    catch (err) {
        return next(err);
    }
});








app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(3000, function () {
    console.log('App on port 3000');
})