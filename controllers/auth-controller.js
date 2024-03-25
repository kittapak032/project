const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require("../models/db")

module.exports.register = async (req, res, next) => {
    const { username, password, confirmPassword, email, address} = req.body;

    try {
        if (!(username && password && confirmPassword)) {
            return next(new Error('Fulfill all inputs'));
        }
        if (confirmPassword !== password) {
            throw new Error('confirm password not match');
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        const data = {
            username, 
            password: hashedPassword,
            email,
            address
        };

        const rs = await db.user.create({ data });
        console.log(rs);
    
        res.json({ msg: 'Registration successful' });
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try { 
    if (!(username.trim() && password.trim())) {
        throw new Error('Username or password must not be blank');
    }
    

        // Find username in database
        const user = await db.user.findFirstOrThrow({ where: { username: username }});
       
        // Check password
        const pwOK = await bcrypt.compare(password, user.password);
        if (!pwOK) {
            throw new Error('Invalid login');
        }
        // issue jwt token 
        const payload = { id: user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        console.log(token)
        res.json({token : token})
    } catch (err) {
        next(err);
    }
};
