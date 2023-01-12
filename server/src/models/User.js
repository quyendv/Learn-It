const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now, // or Date.now() or use timestamps
        // },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', UserSchema);
