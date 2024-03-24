const bcrypt = require('bcryptjs')
const prisma = require('../models/db')

module.exports.register = async (req, res, next) => {
    const { username, password, confirmPassword, email} = req.body;

    try {
        if( !(username && password && confirmPassword ) ) {
            return next( new Error('Fulfill all inputs'));
        }
        if( confirmPassword !== password) {
            throw new Error('confirm password not match');
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        const data = {
            username, 
            password : hashedPassword,
            email
        };

        const rs = await db.user.create({ data })
        console.log(rs)
    
        res.json ({msg: 'in Register successful'} );
    } catch(err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    
    if (!(username.trim() && password.trim())) {
        throw new Error('Username or password must not be blank');
    }
    
    try {
        // Find username in database
        const user = await prisma.user.findFirst({ where: { username: username }});
        if (!user) {
            throw new Error('User not found');
        }
        
        // Check password
        const pwOK = await bcrypt.compare(password, user.password);
        if (!pwOK) {
            throw new Error('Invalid password');
        }
        
};
