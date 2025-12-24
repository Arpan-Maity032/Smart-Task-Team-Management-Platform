const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("MongoDb connected");
    }
    catch (err){
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;