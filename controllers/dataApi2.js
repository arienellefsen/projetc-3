var express = require('express');
var apirouter2 = express.Router();
var Place2 = require("./../models/Place2.js");

//Ariene route saves the pac
// This is the route we will send POST requests to save each search.
apirouter2.post("/savePac", function(req, res) {
    console.log("BODY: " + req.body);
    // Here we'll save the location based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Place2.create({
        name: req.body.name,
        address: req.body.address,
        googlePlaceId: req.body.placeId
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Saved Search");
        }
    });
});


module.exports = apirouter2;