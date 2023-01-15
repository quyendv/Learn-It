import createError from 'http-errors';

export const badRequest = (err, res) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    });
};

export const internalServerError = (err, res) => {
    const error = createError.InternalServerError(err);
    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    });
};

export const notAuth = (err, res, isExpired) => {
    const error = createError.Unauthorized(err);
    return res.json({
        err: isExpired ? 2 : 1, // token hết hạn thì 2, invalid thì 1
        msg: error.message,
    });
};
