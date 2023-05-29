import { actionTypes } from '~/constants';

const initState = {
    // authLoading: true,
    isAuthenticated: false,
    accessToken: null, // chỉ lưu token vào localStorage thôi
    user: null,
    msg: '', // cái này có thể k cần, (thường dùng để phân biệt các message khi login/register)
};

// Đm lỡ thêm async vào hàm authReducer lúc khởi tạo, bảo sao lỗi mãi k chịu update
const authReducer = (state = initState, action) => {
    switch (action.type) {
        // case actionTypes.LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         authLoading: false,
        //         isAuthenticated: true,
        //         accessToken: action.payload.accessToken,
        //         user: 'Success. User is ...',
        //         msg: action.payload.msg,
        //     };
        // case actionTypes.LOGIN_FAIL:
        //     return {
        //         ...state,
        //         authLoading: false,
        //         isAuthenticated: false,
        //         accessToken: null,
        //         msg: null,
        //         user: null,
        //     };
        case actionTypes.SET_AUTH:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
