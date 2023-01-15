const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // tắt warning cc gì ấy
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@learn-it.p3h9zld.mongodb.net/?retryWrites=true&w=majority`,
        );
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB; // or {connectDB} and import database and use database.connectDB()
