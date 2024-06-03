const userSchema = require('../models/userModel')

const createUser = async (req) => {
    const newUser = new userSchema(req);
    const user = await newUser.save();
    return user
}

const getUser = async (req) => {
    console.log("In repository")
    const user = await userSchema.findOne({ email: req })
    console.log(user)
    return user
}

module.exports = {
    createUser, getUser
}