import joi from 'joi';

// User rules
export const username = joi.string().required();
export const password = joi
    .string()
    .min(6)
    // .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')) // chữ + số, [6, 30]
    // .pattern(
    //     new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
    //     'Password must have at least 8 characters, one uppercase, one lowercase and one special character',
    // ) // min 8, at least number, uppercase, lowercase, special character. See more: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
    .required();
// export const confirmPassword = joi.Joi.ref('password');

// Post rules
export const title = joi.string().required();
