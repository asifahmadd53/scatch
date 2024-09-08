const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateToken')


module.exports.registerUser = async (req, res)=>{
    try{
        let {email, fullname, password} = req.body
    
        let user = await userModel.findOne({email:email})
        if(user) return res.status(401).send('You already have an account ');

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const createduser = await userModel.create({
            email,
            fullname,
            password:hash
        })
        let token = generateToken(createduser)
        res.cookie('token', token)
        
        res.send("user created ")
    }
    catch(err){
        res.send(err.message)
    }
}

module.exports.loginUser = async (req,res)=>{
    let {email, password} = req.body

    let user = await userModel.findOne({email:email});
    if(!user) return res.status(401).send('Invalid email or password')
    
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            if (result) {
                let token = generateToken(user);
                res.cookie('token', token);
                res.send('You can login');
            } else {
                res.status(401).send('Invalid email or password');
            }
        });
}

module.exports.logout =async (req,res)=>{
    res.clearCookie('token')
}