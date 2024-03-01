import mongoose, { Schema } from "mongoose"

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the user.
 *          name:
 *            type: string
 *            description: The name of the user.
 *          email:
 *            type: string
 *            format: email
 *            description: The email address of the user.
 *          password:
 *            type: string
 *            description: user account access passphrase
 *        example:
 *           name: John Doe
 *           email: johndoe@example.com
 */
const userSchema = Schema({
    name: String,
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'require some format for email'],
        require: [true, 'email required']
    },
    password: String
})

const userModel = mongoose.model('user', userSchema)
export default userModel
