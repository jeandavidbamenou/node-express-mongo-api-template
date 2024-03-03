import { Router } from "express"
import { makeErrorSafe } from "../config/utils.js"
import {
    requireAuthToken,
    requireEmailUnused
} from "../middleware/user.js"
import {
    createAccount,
    login,
    deleteAccount,
    changeUsername,
    changePassword
} from "../controller/user.js"

const userRouter = Router()

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email, must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password, must adhere to format requirements
 *             required:
 *               - email
 *     responses:
 *       201:
 *         description: Request successful, user created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *                   example: created
 *       403:
 *         description: Forbidden, validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               emailInUse:
 *                 summary: Email already in use
 *                 value:
 *                   error: "email already in use"
 *               wrongPasswordFormat:
 *                 summary: Wrong password format
 *                 value:
 *                   error: "wrong password format"
 */
userRouter.post('/register', makeErrorSafe(requireEmailUnused), makeErrorSafe(createAccount))

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *                 required: true
 *               password:
 *                 type: string
 *                 description: User password
 *                 required: true
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: User authorization token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.5fJgpiqMkkb8Yb8S7I2VnS5PvoIvY0plD5C1P5A1fXg
 *       403:
 *         description: Forbidden, login failed due to unrecognized email or invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               unrecognizedEmail:
 *                 summary: Unrecognized email
 *                 value:
 *                   error: "user with this email doesn't exist"
 *               invalidPassword:
 *                 summary: Invalid password
 *                 value:
 *                   error: "password doesn't match"
 */
userRouter.post('/login', makeErrorSafe(login))

/**
 * @swagger
 * /user/remove:
 *   delete:
 *     summary: Remove a user
 *     tags:
 *       - User
 *     security:
 *       - Authorization: []
 *     responses:
 *       401:
 *         description: Unauthorized - Missing or invalid authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       203:
 *         description: Successfully deleted the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *                   example: deleted
 */
userRouter.delete('/remove', requireAuthToken, makeErrorSafe(deleteAccount))

/**
 * @swagger
 * /user/change/name:
 *   put:
 *     summary: Change a user's name
 *     tags:
 *       - User
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New user name
 *                 required: true
 *     responses:
 *       203:
 *         description: Username updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *                   example: done
 *       401:
 *         description: Invalid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: unauthorized
 */
userRouter.put('/change/name', requireAuthToken, makeErrorSafe(changeUsername))

/**
 * @swagger
 * /user/change/password:
 *   put:
 *     summary: Change a user's password
 *     tags:
 *       - User
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Old user password
 *                 required: true
 *               newPassword:
 *                 type: string
 *                 description: New password to replace the old one
 *                 required: true
 *     responses:
 *       203:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *                   example: done
 *       401:
 *         description: Unauthorized due to invalid JWT token or incorrect old password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: unauthorized
 *       403:
 *         description: New password is not secure, can't process update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: insecure password, can't process update
 */
userRouter.put('/change/password', requireAuthToken, makeErrorSafe(changePassword))

export default userRouter
