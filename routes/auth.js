import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/userSchema.js';
import authenticate from '../middlewares/authenticate.js';
import sendEmail from '../middlewares/sendEmail.js';

const router = express.Router();

//test route
router.get("/", (req, res) => {
    res.send("Hello world!. & Backend");
})

//Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(404).send("Fill feilds properly.");
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const user = new User({ username, email, password });
            const resp = await user.save();
            console.log(resp);
            if (resp) {
                res.status(200).json({ msg: "User Created" });
            }
            else {
                res.status(500).json({ err: "Error occured!" });
            }
        }
        else {
            res.status(404).json({ msg: "User already Exists." });
        }

    }
    catch (err) {
        res.status(500).json({ error: err.name });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(404).json({ err: "Fill feilds properly." });
    }

    try {
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            res.status(404).json({ msg: "User doesn't Exists." });
        }
        const loginUser = await bcrypt.compare(password, user.password);
        let token = await user.generateAuthToken();
        res.cookie("connect", token, {
            httpOnly: true,
            maxAge: new Date(Date.now() + 900000)
        });
        if (!loginUser) {
            res.status(500).json({ msg: "Invalid Credentials" });
        }
        res.status(200).json({ msg: "Succesfully Logged in.", token: token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GetData route

router.get("/getdata", authenticate, (req, res, next) => {
    if (!req.user) {
        res.status(500).send("Error.")
    }
    res.status(200).send(req.user);
    next();
});

//forgotpassword

router.post("/forgot", async (req, res) => {

    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).send("Email Not found.");
        }
        const resetToken = await user.generateResetToken();

        const resetUrl = `http://localhost:3000/${resetToken}`;

        const message =
            `
        <body
        style="background-image: url(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80); margin-top: 0px;">
        <center>
            <h2
                style="background-color: rgb(128, 27, 125); color: #fff; font-family: Arial, Helvetica, sans-serif; padding: 20px 10px;">
                bheads257
            </h2>
        </center>
        <h3
            style="color: red; text-align: center; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            Your request to reset password
        </h3>
        <p
            style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: large; font-weight: bold;">
            Link to change password is below:
        </p>
        <a href="${resetUrl}" clicktracking="off"
            style="display: block; text-align: center; margin: 20px 0; font-size: 1.2rem; font-weight: bold; color: rgb(128, 27, 125); text-decoration: none; border: 2px solid rgb(128, 27, 125); padding: 10px 20px;">
            ${resetUrl}
        </a>
        <footer
            style="background-color: black; color: #fff; opacity: 0.9; height: 3rem; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            &copy; All Rights Reserved - 2022
        </footer>
    </body>

        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset Request.",
                text: message
            });

            res.status(200).send("Email sent");

        } catch (error) {
            user.resetpasswordToken = undefined;
            user.resetpasswordExpire = undefined;
            await user.save();
            console.log(error.message);
        }


    } catch (error) {

    }
});

//Reset password
router.put('/passwordreset/:resetToken', async (req, res) => {
    const resetpasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetpasswordToken: resetpasswordToken,
            resetpasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            res.status(404).send("Invalid token");
        }
        user.password = req.body.password;
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;

        await user.save();
        res.status(200).send("password changed successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//logout route

router.get("/logout", async (req, res) => {
    res.clearCookie('connect');
    res.status(200).send("Successfully logged Out.");
});

export default router;
