// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Place schema
var PlaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pictureURL: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    officialWebsite: {
        type: String
    },
    googlePlaceId: {
        type: String
    }
});

// Create the Place model with the PlaceSchema
var Place = mongoose.model("Place", PlaceSchema);

// Export the model
module.exports = Place;