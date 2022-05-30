const mongoose = require('mongoose');
require('dotenv').config();

const { password, username, cluster, dbName } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log(err.message);
    // Exiting process on failure
    process.exit(1);
  }
};

module.exports = connectDB;
