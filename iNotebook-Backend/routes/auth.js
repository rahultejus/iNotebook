const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "rahulisagoodboy$"

// ROUTE 1:Create User using POST: "/api/auth/createuser".Doesn't need login
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail().withMessage('Not a valid e-mail address'),
    body('password', 'Password should be atleast five character').isLength({ min: 5 }),
], async (req, res) => {
    // If there are any type of error then give bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check whether User exist already with same Email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ error: "sorry user with this Email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        //  console.log(jwtData)
        res.json({ authtoken })
        // res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
//ROUTE 2:Authenticate user using POST: api/auth/login , No login required

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be balnk').exists(),
], async (req, res) => {
    // if there are bad request then give error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user =await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(404).json({ errors: "Please try to login with correct credentials" });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});

//ROUTE 3:get loggedIn user details  using POST "api/auth/getuser" login required   
router.post('/getuser',fetchuser,async (req, res) => {
try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
} 
})
module.exports = router;