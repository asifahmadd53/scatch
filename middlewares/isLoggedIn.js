const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')


module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'You need to login first');
        return res.redirect('/');
    }
    
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select('-password');
        
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        req.flash('error', 'You need to login first');
        res.redirect('/');
    }
};