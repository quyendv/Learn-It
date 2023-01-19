import { actionTypes } from '~/constants';
import * as apis from '~/apis';

export const login = (loginData) => async (dispatch) => {
    const response = await apis.login(loginData); // apis.login trả về response.data nếu success rồi, response ở đây chỉ là {err: , msg: }
    dispatch(!response.err ? loginSuccess(response) : loginFail(response));
};

export const loginSuccess = (response) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: response,
});

export const loginFail = (response) => ({
    type: actionTypes.LOGIN_FAIL,
    payload: response,
});
