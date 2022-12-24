const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fatchuser= require('../middleware/fatchuser')

const JWT_SECRET = "kavyaisagoodgirl"

// create a user using :post "/api/auth/createuser". no login require
router.post('/createuser', [
    body('name', 'please a enter viled name').isLength({ min: 3 }),
    body('email', 'please a enter viled email').isEmail(),
    body('password', 'please a enter viled password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        //   create a object for containing a user id
        const data = {
            user: {
                id: user.id
            }   
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.send(user)
        success= true;
        res.send({ success,authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
})
 
// create a user using :post "/api/auth/login". no login require
router.post('/login', [
    body('email', 'please a enter viled email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
   let  success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct cordentials " })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ error: "please try to login with correct cordentials " })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
          success= true;
        // res.send(user)
        res.json({success,authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
})

// Route 3 : get loggedin user details using POST "api/auth/login" login requeride 
router.post('/getuser',fatchuser, async (req, res) => {
    try {
    
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        console.log(user)
    res.send(user);
    } catch (error) {  
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
})
module.exports = router

