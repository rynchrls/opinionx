const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    if (connect) console.log(`database connected: ${connect.connection.name}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConfig;
