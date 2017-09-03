// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Chat schema
var ChatSchema = new Schema({
    chatOn: {
        type: Schema.Types.ObjectId,
        ref: "Pac"
    },
    sharedWithUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    // one Chat has many comment's ObjectId, ref refers to the Comment model
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// Create the Chat model with the ChatSchema
var Chat = mongoose.model("Chat", ChatSchema);

// Export the model
module.exports = Chat;