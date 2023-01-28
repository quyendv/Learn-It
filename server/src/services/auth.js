const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ username, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            // check username already exists
            const response = await User.findOne({ username });
            if (response) {
                resolve({
                    err: 1,
                    msg: 'Username is already registered',
                    accessToken: null,
                });
            }

            // newUser
            const newUser = new User({ username, password: hashPassword(password) });
            await newUser.save();

            // token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
                expiresIn: '5d',
            });

            resolve({
                err: 0,
                msg: 'Register successfully',
                accessToken: `Bearer ${accessToken}`,
            });
        } catch (error) {
            reject(error);
        }
    });

export const login = ({ username, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findOne({ username });

            // create token if valid account
            const isValidUser = response && bcrypt.compareSync(password, response.password);
            const accessToken = isValidUser
                ? jwt.sign({ userId: response._id }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '5d' })
                : null;

            // resolve
            resolve({
                err: isValidUser ? 0 : 1,
                msg: isValidUser ? 'Login successfully' : response ? 'Password is wrong' : 'Username is not registered',
                accessToken: isValidUser ? `Bearer ${accessToken}` : null,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getUser = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findById(userId).select('-password'); // hoặc findById(userId, '-password') -> không trả về pass

            resolve({
                err: response ? 0 : 1,
                msg: response ? 'Get user infos successfully' : 'User not found',
                user: response ? response : null, // response || null
            });
        } catch (error) {
            reject(error);
        }
    });
