export const actionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
};

export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'someDeployURL';
