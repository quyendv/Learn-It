export const actionTypes = {
    // Auth:
    // LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    // LOGIN_FAIL: 'LOGIN_FAIL',
    SET_AUTH: 'SET_AUTH',
    LOGOUT: 'LOGOUT',

    // Post:
    POST_LOADED_SUCCESS: 'POST_LOADED_SUCCESS',
    CREATE_POST: 'CREATE_POST',
    DELETE_POST: 'DELETE_POST',
    UPDATE_POST: 'UPDATE_POST',

    // Modal:
    SET_CREATE_POST_MODAL: 'SET_CREATE_POST_MODAL',
    SET_UPDATE_POST_MODAL: 'SET_UPDATE_POST_MODAL',
    FIND_POST: 'FIND_POST',
};

export const apiUrl =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'https://learn-it-be.onrender.com/api'; // NODE_ENV build tự ghi đè, deploy BE xong thì pass url mới /api vào

export const postStatus = {
    TO_LEARN: 'TO LEARN',
    LEARNING: 'LEARNING',
    LEARNED: 'LEARNED',
};
