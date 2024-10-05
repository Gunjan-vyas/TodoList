require("dotenv").config(); //required to get .env file config values
module.exports = {
  db: {
    url: process.env.MONGO_URI,
  },
};
