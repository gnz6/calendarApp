const mongoose = require('mongoose');
// const {MONGO_PASSWORD} = process.env

const dbConnection = async () => {
try {
;
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.db_string);

    console.log("DB Connected");

} catch (error) {
    console.log(error);
    throw new Error(error);

}
}

module.exports = dbConnection