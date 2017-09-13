var express = require('express');
var apirouter = express.Router();
var Pac = require("./../models/Pac.js");
var Place = require("./../models/Place.js");
var User = require("./../models/User.js");

// add a User
// user id required in req (validated: add new user)
apirouter.post("/user/", function(req, res) {
        console.log("add: " + req.body.user);
        console.log("user email: " + req.body.user.emailAddress);
        //assume req has item which is with JSON data similar to PAC
        // Save these results in an object

        var reqEmailAddress = req.body.user.emailAddress;

        User.findOne({
             emailAddress: reqEmailAddress
        }) // ..and populate all of the pacs for the user
        .populate({
            path: "pacs",
            options: {
                sort: [{
                    "createdAt": -1
                }]
            }
        }).exec(function(error, existinguser) {
                if (error) {
                    console.log(error);
                } else {
                    if (! existinguser) {//cannot use existinguser.length===0 for findOne function
                        //save the User
                        console.log("add: " + reqEmailAddress);
                        
                        // Using our User model, create a new entry
                        // This effectively passes the result object to the entry
                        var entry = new User(req.body.user);

                        // Now, save that entry to the db
                        entry.save(function(err, newuser) {
                            if (err) {
                                console.log(err);
                            } else {
                                 res.json(newuser);
                            }
                        });
                    }
                    else {
                        res.json(existinguser);
                    //     console.log("find existing record with: " + articleStoryId);
                    }
            }
        }); //end lookup storyId and save record if it is a new story
});

// update a User
// user id required in req (validated: add new user)
apirouter.put("/user/", function(req, res) {
        console.log("update: " + req.body.user);
        console.log("user email: " + req.body.user.emailAddress);
        //assume req has item which is with JSON data similar to PAC
        // Save these results in an object

        var reqEmailAddress = req.body.user.emailAddress;

            // Use the article id to find and update it's comments
            User.findOneAndUpdate({
                    _id: user.id
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
});

// OK get a User with all info including pacs by user id with the most recent pac listed first
// user id required in req
//validated: user without any pac
/*http://localhost:3000/api/users/59b4659335c77b446c612608
{
"_id": "59b4659335c77b446c612608",
"firstName": "Xiaoying",
"lastName": "Wen",
"emailAddress": "xiaoying@a.com",
"__v": 0,
"pacs": []
}*/
apirouter.get("/users/:id", function(req, res) {
        console.log("get: " + req);
        //assume req has item which is with JSON data similar to PAC
        User.findOne({
            "_id": req.params.id
        })
        .populate({
            path: "pacs",
            // Get places of pacs - populate the 'places' array for every pac
            // populate: { path: 'places' },
            options: {
                sort: [{
                    "createdAt": -1
                }]
            }
        })
        // now, execute our query
        .exec(function(error, userwpacs) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(userwpacs);
            }
        });
});


//OK This will get the Pacs from the mongoDB
//validated with user who does not have any pac
/*http://localhost:3000/api/users/59b4659335c77b446c612608/pacs
[]
*/
apirouter.get("/users/:id/pacs", function(req, res) {
    // Grab at most 15 Pacs orded with the most recent first from DB
    Pac.find({createdBy: req.params.id}).sort({
        createdAt: -1
    }).limit(15).exec(function(error, arrayofpacs) {
        //do not populate details including the comments 
        //only upon one pac-click load the details
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            res.json(arrayofpacs);
        }
    });
});

// This will get the Pac including place details from the mongoDB
//Validated
//http://localhost:3000/api/pacs/59b4d2a22604b4a308bcbe70
apirouter.get("/pacs/:id", function(req, res) {
        Pac.findOne({
            "_id": req.params.id
        })
        .populate({
            path: "places",
            options: {
                sort: [{
                    "createdAt": 1
                }]
            }
        })
        // now, execute our query
        .exec(function(error, pac) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(pac);
            }
        });
});

// This will get the Place details from the mongoDB
//Validated
//http://localhost:3000/api/places/59b4ccca6b49a48dfc38eb18
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

//Add a Pac, Pac.createdBy is required to be set with the userid
//validated with add a pac 
//Note: no unique check if update a pac have to use the post pocs/:id
apirouter.post("/pac", function(req, res) {
        console.log("add: " + JSON.stringify(req.body.pac));
        console.log("to: " + req.body.pac.createdBy);
        var arrayOfPlaceIds = [];
        var promises = [];
        for(var placeIndex in req.body.pac.places){
            promises.push(asynSavePlace(arrayOfPlaceIds, req.body.pac.places[placeIndex]));
        }

        Promise.all(promises).then(() => {
                console.log("save places done");
                //var newpac = addPac(req.body.pac, arrayOfPlaceIds, req.body.pac.createdBy)
                var pac = req.body.pac;
                    pac.places = arrayOfPlaceIds;
                     var entry = new Pac(pac);

                        // Now, save that entry to the db
                        entry.save(function(err, doc) {
                            if (err) {
                                console.log(err);
                                return error
                            } else {
                                console.log("new pac doc: " + doc);
                                console.log(req.body.pac.createdBy);
                                 // Use the user id to find and update it's pacs
                                User.findOneAndUpdate({
                                    "_id":  req.body.pac.createdBy
                                }, {
                                    $push: {
                                        "pacs": doc._id
                                    }
                                })
                                // Execute the above query
                                .exec(function(err, doc) {
                                    // Log any errors
                                    if (err) {
                                        res.send(err);
                                        return err
                                    } else {
                                         console.log(doc);
                                        res.send(doc);
                                    }
                                });
                            }
                        });

        })
        .catch((e) => {
              console.log(e);
        });
});

//this return a promise which can be .then
//To provide a function with promise functionality
function asynSavePlace(placeIdArray, place){
    console.log(JSON.stringify(place));
        console.log("to add place " + place);
    console.log("to add: " + place.name + " with " 
                 + place.lat + " " + place.lng );
    return new Promise((resolve, reject) => {
            Place.findOne({
                name: place.name, lat: place.lat, lng: place.lng
            }) // ..and populate all of the pacs for the user
            .exec(function(error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (!doc) {//cannot use doc.length===0 for findOne function
                            //save the User
                            console.log("No place found with " + place.name + " with " 
                                + place.lat + " " + place.lng );
                            
                            // Using our User model, create a new entry
                            // This effectively passes the result object to the entry
                            var entry = new Place(place);

                            // Now, save that entry to the db
                            entry.save(function(err, newdoc) {
                                if (err) {
                                    console.log(err);
                                } else {
                                     console.log(place.name + " added");
                                     placeIdArray.push(newdoc._id);
                                     resolve("Success!");
                                }
                            });
                        }
                        else {
                            console.log("find existing place " + place.name 
                                + " with " + place.lat + " " + place.lng );
                            placeIdArray.push(doc._id);
                            resolve("Success!");
                        }
                    }
            }); //end lookup storyId and save record if it is a new story
    }); //return Promise
}


//OK save the pac to the DB and add to the User pacs ref
function addPac(pac, placeIds, userid){
     pac.places = placeIds;
     var entry = new Pac(pac);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
            if (err) {
                console.log(err);
                return error
            } else {
                 // Use the user id to find and update it's pacs
                User.findOneAndUpdate({
                    "_id": userid
                }, {
                    $push: {
                        "pacs": doc._id
                    }
                })
                // Execute the above query
                .exec(function(err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                        return err
                    } else {
                        return doc
                    }
                });
            }
        });
}

// Update a PAC
// user id required in req
// pac id required in req
apirouter.put("/pac", function(req, res) {
        console.log("update: " + JSON.stringify(req.body.pac));
        console.log("update: " + JSON.stringify(req.body.id));
        var updatedPac = req.body.pac;
        var arrayOfPlaceIds = [];
        var promises = [];

        Pac.findById(req.body.id, function (err, pac){
            if (err) {
                res.send(err);
            } else {
                if(!pac){
                  res.send("not found pac with:" + req.body.id);
                } else{
                    for(var placeIndex in req.body.pac.places){
                        promises.push(asynSavePlace(arrayOfPlaceIds, req.body.pac.places[placeIndex]));
                    }

                    Promise.all(promises).then(() => {
                        console.log("save places done");
                        pac.title = updatedPac.title;
                        pac.category = updatedPac.category;
                        pac.pictureURL = updatedPac.pictureURL;
                        pac.places = arrayOfPlaceIds;
                        pac.createdBy = updatedPac.createdBy;  //because save is used , must pass all data
                        //because need to first address the places so use save instead of update
                        pac.save(function (err, savedPac) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json(savedPac);
                            }
                        });
                    })
                    .catch((e) => {
                          console.log(e);
                    });   
                }
            }
        });//findById
});


// // Create a new comment 
// // Chat id required in req
// apirouter.post("/chats/comment", function(req, res) {
//     // Create a new comment and pass the req.body to the entry
//     var newComment = new Comment(req.body);

//     // And save the new comment the db
//     newComment.save(function(error, doc) {
//         // Log any errors
//         if (error) {
//             res.send(error);
//         }
//         // Otherwise
//         else {
//             // Use the article id to find and update it's comments
//             Chat.findOneAndUpdate({
//                     "_id": req.params.id
//                 }, {
//                     $push: {
//                         "comments": doc._id
//                     }
//                 })
//                 // Execute the above query
//                 .exec(function(err, doc) {
//                     // Log any errors
//                     if (err) {
//                         res.send(err);
//                     } else {
//                         res.json(doc);
//                     }
//                 });
//         }
//     });
// });

module.exports = apirouter;