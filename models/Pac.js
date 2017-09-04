// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Pac schema
var PacSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pictureURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    detailsId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    myown: {
        type: Boolean,
        required: true
    },
    myrate: {
        type: Number, min: 0, max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    googlePlaceId: {
        type: String
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }
});

// Create the Pac model with the PacSchema
var Pac = mongoose.model("Pac", PacSchema);

// Export the model
module.exports = Pac;