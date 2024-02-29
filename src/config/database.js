import mongoose from "mongoose"

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'mongodb connection error: '))
connection.once('open', function() { console.log('connected to db cluster') })

export default mongoose
