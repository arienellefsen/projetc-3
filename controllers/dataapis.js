var express = require('express');
var apirouter = express.Router();
var Comment = require("./../models/Comment.js");
var Pac = require("./../models/Pac.js");
var Place = require("./../models/Place.js");
var Event = require("./../models/Event.js");
var Chat = require("./../models/Chat.js");
var Comment = require("./../models/Comment.js");
var User = require("./../models/User.js");

//var moment = require('moment')

// This will get the Pacs from the mongoDB
apirouter.get("/users/:userId/pacs", function(req, res) {
    // Grab at most 15 Pacs orded with the most recent first from DB
    Pac.find({}).sort({
        date: -1
    }).limit(15).exec(function(error, doc) {
        //do not populate details including the comments 
        //only upon one pac-click load the details
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
});

// This will get the Place details from the mongoDB
apirouter.get("/places/:id", function(req, res) {
        Place.findOne({
            "_id": req.params.id
        })
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
});

// This will get the Event details from the mongoDB
apirouter.get("/events/:id", function(req, res) {
        Event.findOne({
            "_id": req.params.id
        })
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
});

// Grab a chat thread by it's ObjectId
apirouter.get("/chats/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        Chat.findOne({
            "_id": req.params.id
        })
        // ..and populate all of the comments associated with it with the order of most recent first 
        .populate({
            path: "comments",
            options: {
                sort: [{
                    "createdAt": -1
                }]
            }
        })
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
});

// Add a User
// user id required in req
apirouter.post("/user", function(req, res) {
        console.log("add: " + req);
        //assume req has item which is with JSON data similar to PAC
        // Save these results in an object
        var entry = new User(req.params.user);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
            if (err) {
                console.log(err);
            } else {;
                res.json(doc);
            }
        });
});

// Add a Pac
// user id required in req
apirouter.post("/pac", function(req, res) {
        console.log("add: " + req);
        //assume req has item which is with JSON data similar to PAC
        // Save these results in an object
        var newpac = {};
        newpac.title = req.params.item.title.trim();
        var entry = new Pac(newpac);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
            if (err) {
                console.log(err);
            } else {;
                res.json(doc);
            }
        });
});

// Update a PAC
// user id required in req
// pac id required in req
apirouter.put("/pac", function(req, res) {
    Pac.findById(req.params.id, function(err, pac) {
        pac.save(function(err, comment) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/articles/' + req.body.articleId);
            }
        });
    });
    //TODO handle share
});

// Create a new comment 
// Chat id required in req
apirouter.post("/chats/comment", function(req, res) {
    // Create a new comment and pass the req.body to the entry
    var newComment = new Comment(req.body);

    // And save the new comment the db
    newComment.save(function(error, doc) {
        // Log any errors
        if (error) {
            res.send(error);
        }
        // Otherwise
        else {
            // Use the article id to find and update it's comments
            Chat.findOneAndUpdate({
                    "_id": req.params.id
                }, {
                    $push: {
                        "comments": doc._id
                    }
                })
                // Execute the above query
                .exec(function(err, doc) {
                    // Log any errors
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(doc);
                    }
                });
        }
    });
});



module.exports = apirouter;