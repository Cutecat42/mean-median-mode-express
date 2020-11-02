const express = require('express');
const ExpressError = require("./expressError")
const {findMean, findMedian, findMode} = require("./helpers")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res, next) {
    try {
        if(!req.query.nums || req.query.nums.length < 1) throw new ExpressError("Nums are required", 400);
        let nums = req.query.nums
    
        return res.json(findMean(nums,next))
    }
    catch (err) {
        return next(err);
    }
});

app.get('/median', function(req, res, next) {
    try {
        if(!req.query.nums || req.query.nums.length < 1) throw new ExpressError("Nums are required", 400);
        let nums = req.query.nums

        return res.json(findMedian(nums,next))
    } 
    catch (err) {
        return next(err);
    }
});

app.get('/mode', function(req, res, next) {
    try {
        if(!req.query.nums || req.query.nums.length < 1) throw new ExpressError("Nums are required", 400);
        let nums = req.query.nums

        return res.json(findMode(nums,next))
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

// module.exports = {findMean};