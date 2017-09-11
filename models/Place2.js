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

    address: {
        type: String,
        required: true
    },
    googlePlaceId: {
        type: String
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    }
});

// Create the Place model with the PlaceSchema
var Place2 = mongoose.model("Place2", PlaceSchema);

// Export the model
module.exports = Place2;