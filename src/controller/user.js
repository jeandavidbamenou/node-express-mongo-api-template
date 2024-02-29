import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from "../model/user.js"
import { pickValue } from '../config/utils.js'

export async function createAccount(req, res)
{
    function isValidePassword(password)
    {
        return true
    }

    let password = req.body.password

    if (!isValidePassword(password))
        return res.status(403).json({error: "insecure password"})
    password = await bcrypt.hash(password, 10)
    await UserModel.create(req.body)
    res.status(201).json({repport: "created"})
}

export async function login(req, res)
{
    const user = await UserModel.findOne({email: req.body.email})

    if (!user)
        return res.status(403).json({error: "unrecognized email"})

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (passwordMatch)
        res.status(200).json({authorization: jwt.sign(user._id, process.env.JWT_SECRET)})
    else
        res.status(403).json({error: "invalide password"})
}

export function deleteAccount(pathToAccountId)
{
    return async function (req, res)
    {
        const uid = pickValue(req, pathToAccountId)

        await UserModel.findByIdAndDelete(uid)
        res.status(203).json({repport: "done"})
    }
}
