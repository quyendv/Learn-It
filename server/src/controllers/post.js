import Joi from 'joi';
import { title } from '../helpers/joiSchema';
import { badRequest, internalServerError } from '../middlewares/handleErrors';
import * as services from '../services';

export const createPost = async (req, res) => {
    try {
        const { error } = Joi.object({ title }).validate({ title: req.body.title }); // Chú ý đừng truyền validate(req.body.title) mà phải là obj, chỉ truyền vào validate những rule ở schema, k đc truyền thừa -> ở đây chỉ cần title
        if (error) return badRequest(error.details[0]?.message, res);

        const response = await services.createPost(req.body, req.userId); // req.userId gán ở middleware verifyToken
        return res.status(200).json(response);
    } catch (err) {
        return internalServerError(err, res);
    }
};

export const getPosts = async (req, res) => {
    try {
        const response = await services.getPosts(req.userId, req.query); // truyền userId để chỉ lấy post của user đó, thêm query để thêm limit, order, ...
        return res.status(200).json(response);
    } catch (err) {
        return internalServerError(err, res);
    }
};

export const updatePost = async (req, res) => {
    try {
        const { error } = Joi.object({ title }).validate({ title: req.body.title });
        if (error) return badRequest(error.details[0]?.message, res);

        const response = await services.updatePost(req.body, req.params.id, req.userId); // updatePost(body, postId, userId)
        return res.status(200).json(response);
    } catch (err) {
        return internalServerError(err, res);
    }
};

export const deletePost = async (req, res) => {
    try {
        const response = await services.deletePost(req.params.id, req.userId);
        return res.status(200).json(response);
    } catch (err) {
        return internalServerError(err, res);
    }
};
