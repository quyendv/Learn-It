import joi from 'joi';
import { password, username } from '../helpers/joiSchema';
import { badRequest, internalServerError } from '../middlewares/handleErrors';
import * as services from '../services';

export const register = async (req, res) => {
    try {
        // const { username, password } = req.body;
        // Validate: simple (use Joi later)
        // if (!username || !password) {
        //     return badRequest('Missing username and/or password', res);
        // }

        const { error } = joi.object({ username, password, confirmPassword: joi.ref('password') }).validate(req.body); // chỉ nhận username, password và confirmPassword, k nhận ngoài schema vừa tạo bởi joi.object() -> confirmPassword import mà k đc, truyền vào ref string key trong schema vừa tạo mới đc sao ấy
        // -> tuy nhiên phần confirmPassword này nên check ở FE, BE chỉ check data đủ chưa thôi thì hơn
        if (error) return badRequest(error.details[0]?.message, res);

        // After validate input form
        const response = await services.register(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return internalServerError(err, res);
    }
};

export const login = async (req, res) => {
    try {
        const { error } = joi.object({ username, password }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);

        // After validate input form
        const response = await services.login(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return internalServerError(err, res);
    }
};

export const getUser = async (req, res) => {
    try {
        const response = await services.getUser(req.userId);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(error, res);
    }
};
