import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from "../model/user.js"

function isValidePassword(password=String())
{
    // implement password validation process
    // maybe it should contain 1 upper case letter, symbole, lower casee, ...
    if (password.length < 6)
        return false
    return true
}

export async function createAccount(req, res)
{
    let password = req.body.password

    if (!isValidePassword(password))
        return res.status(403).json({error: "insecure password"})
    password = await bcrypt.hash(password, 10)
    await userModel.create(req.body)
    res.status(201).json({repport: "created"})
}

export async function login(req, res)
{
    const user = await userModel.findOne({email: req.body.email})

    if (!user)
        return res.status(403).json({error: "unrecognized email"})

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (passwordMatch)
        res.status(200).json({authorization: jwt.sign(user._id, process.env.JWT_SECRET)})
    else
        res.status(403).json({error: "invalide password"})
}

export async function deleteAccount(req, res)
{
    await userModel.findByIdAndDelete(req.uid)
    res.status(203).json({repport: "done"})
}

export async function changeUsername(req, res)
{
    await userModel.findByIdAndUpdate(req.uid, {name: req.body.name})
    res.status(203).json({repport: "done"})
}

export async function changePassword(req, res)
{
    const user = userModel.findById(req.uid)

    if (!user)
        return res.status(401).json({error: "unhautorized"})
    
    const passwordMatch = await bcrypt.compare(req.body.oldPassword, user.password)

    if (!passwordMatch)
        return res.status(401).json({error: "unhautorized"})
    if (!isValidePassword(req.body.newPassword))
        return res.status(403).json({error: "insecure password, can't proccess update"})
    user.password = await bcrypt.hash(req.body.newPassword, 10)
    await user.save()
    res.status(203).json({repport: "done"})
}
