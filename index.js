import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from 'swagger-ui-express'
import express from "express"
import cors from "cors"
import mongoose from "./src/config/database.js"
import swaggerOpt from "./src/config/swagger.js"
import { repportServerInternalError } from "./src/config/utils.js"
import userRouter from "./src/router/user.js"

const app = express()
const swaggerSpec = swaggerJSDoc(swaggerOpt)

function serverStartCallback()
{
    console.log(`server working on port ${process.env.PORT}`)
}

//mongoose.connect(process.env.DB_URL)
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/user', userRouter)
app.use(repportServerInternalError)
app.listen(process.env.PORT, serverStartCallback)
