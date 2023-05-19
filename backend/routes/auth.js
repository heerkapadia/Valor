const express = require("express")
const router = express.Router()
const users = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
const fetchuser = require("../middlewares/fetchUser");

const JWT_SECRET = "HelloRashid"

// Create a user using : POST "/api/auth/ Doesnt require auth"
router.post("/createUser", [
    body('phone', 'Enter a valid phone no.').isMobilePhone(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password too short').isLength({ min: 3 })
], async (req, res) => {
    // checking validation and errors
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // secured password  = hash(password + salt)
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    try {
        // checking if user already exist
        let newuser = await users.findOne({ phone: req.body.phone })
        if (newuser) {
            return res.status(400).json({ success, error: "This user already exist" });
        }
        // It automatically create a collection in mongodb unlike SQL
        // creating a new user
        newuser = await users.create({
            name: req.body.name,
            phone: req.body.phone,
            password: secPass,
        })
        success = true;
        res.send({ success })
    } catch (error) {
        res.status(500).send("Error has occured");
    }
})

// Authenticate a user
router.post("/login", [
    body('phone', 'Enter a valid phone number').isMobilePhone(),
    body('password', 'Password can not be blank').isLength({ min: 1 })
], async (req, res) => {
    // checking validation and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;
    try {
        let success = false;
        let user = await users.findOne({ phone })
        if (!user) return res.status(500).json({ success, error: "Please try to login with correct credential" });
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(500).json({ success, error: "Please try to login with correct credential" });
        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        req.user = user.id;
        res.send({ success, authToken, userid: user.id })
    } catch (error) {
        res.status(500).send("Error has occured " + error);
    }

})

router.post("/getUser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await users.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        res.status(500).send("some error occured " + error);
    }
})

module.exports = router