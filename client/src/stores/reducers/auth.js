import { actionTypes } from '~/constants';

const initState = {
    authLoading: true,
    isAuthenticated: false,
    accessToken: null,
    user: null,
    msg: '',
};

// Đm lỡ thêm async vào hàm authReducer lúc khởi tạo, bảo sao lỗi mãi k chịu update
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            console.log('success');
            return {
                ...state,
                accessToken: action.payload.accessToken,
                user: 'Success. User is ...',
                msg: action.payload.msg,
            };
        case actionTypes.LOGIN_FAIL:
            console.log('fail');
            return { ...state, accessToken: null, msg: null, user: null };
        default:
            console.log('default');
            return state;
    }
};

export default authReducer;
