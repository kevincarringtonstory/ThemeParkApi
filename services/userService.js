const userRepository = require('../repositories/userRepository')
const jsonwebtoken = require('jsonwebtoken')
const env = require('dotenv')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
env.config()

const createUser = async (req) => {
    const { name, email, password } = req;
    if (name == null || email == null || password == null) {
        return { msg: 'Please include all required fields' };
    }
    return await userRepository.createUser(req)
}

const checkUser = async (req) => {
    const { email, password } = req;
    if (email == null || password == null) {
        return { msg: 'Please include all required fields' };
    }
    const user = await userRepository.getUser(email)
    if (user != null) {
        if (password != user.password) {
            return false
        } else {
            const token = jsonwebtoken.sign({ email: user.email, userid: user.id },
                process.env.TOKEN_KEY, { expiresIn: '1d' }
            )
            return token
        }
    } else {
        return false
    }
}

const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return { msg: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return { msg: 'User registered successfully' };
};

const loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email });

    if (!user) {
        return { msg: 'User does not exist' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return { msg: 'Invalid password' };
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });

    return token;
};

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: 'No Token Provided'
        });
    }
    jsonwebtoken.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: 'Unauthorized'
            });
        }
        next();
    });
};

module.exports = { createUser, checkUser, verifyToken, registerUser, loginUser }