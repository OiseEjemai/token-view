
module.exports.connectDB = async () => {
    const mongoose = require('mongoose');

    const dbUrl = process.env.MONGO_URI
    try {
        await mongoose.connect(dbUrl, {})
            .then(() => console.log('MongoDB connected'))
            .catch((err) => console.log(err));
    } catch (error) {
        console.error(`Error connection to mongoDB: ${error.message}`);
        process.exit(1);
    }
}