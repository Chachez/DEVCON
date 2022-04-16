const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(
      db
      /**
       * Whenever these is an error about URL string parsing resolve with this
       */
      // {
      //   useCreateIndex: true,
      // }
    );
  } catch (err) {
    console.log(err.message);
    // Exiting process on failure
    process.exit(1);
  }
};

module.exports = connectDB;
