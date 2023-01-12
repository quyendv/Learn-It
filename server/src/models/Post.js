const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
        // default: 'TO LEARN'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Link to ModelName not Collection
    },
});

module.exports = mongoose.model('Post', PostSchema);
