import mongoose, { Schema } from "mongoose"

const UserSchema = Schema({
    name: String,
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'require some format for email'],
        require: [true, 'email required']
    },
    password: String
})

const UserModel = mongoose.model('user', UserSchema)
export default UserModel
