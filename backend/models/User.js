const mongoose = require("mongoose")
const { Schema } = mongoose;

const UsersSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    role:{
        type: String,
        default: 'normal'
    }
});
const users = mongoose.model("users", UsersSchema);
users.createIndexes();
module.exports = users;