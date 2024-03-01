import jwt from 'jsonwebtoken'
import userModel from "../model/user.js"

export async function requireEmailUnused(req, res, next)
{
    const user = userModel.findOne({email: req.body.email})

    if (user)
        return res.status(403).json({error: "email already in use"})
    next()
}

export function requireAuthToken(req, res, next)
{
    const token = req.headers['authorization']

    if (!token)
        return res.status(401).json({error: 'unhauthorized'})
    const uid = jwt.verify(token)
    req.uid = uid
    next()
}
