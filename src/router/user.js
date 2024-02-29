import { Router } from "express"
import { requireAuthToken, requireEmailUnused } from "../middleware/user"
import { errorSafeWrapper } from "../config/utils"
import { createAccount, deleteAccount, login } from "../controller/user"

const userRouter = Router()

userRouter.post('/register',
    errorSafeWrapper(requireEmailUnused),
    errorSafeWrapper(createAccount))

userRouter.post('/login',
    errorSafeWrapper(login))

userRouter.get('/delete',
    requireAuthToken,
    errorSafeWrapper(deleteAccount('uid')))

export default userRouter
