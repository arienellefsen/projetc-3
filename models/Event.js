// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Event schema
var EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pictureURL: {
        type: String
    },
    description: {
        type: String
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    officialWebsite: {
        type: String
    },
    googlePlaceId: {
        type: String
    },
    facebookEventId: {
        type: String
    }
});

// Create the Event model with the EventSchema
var Event = mongoose.model("Event", EventSchema);

// Export the model
module.exports = Event;