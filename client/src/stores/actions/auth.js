import * as apis from '~/apis';
// import { setAuthToken } from '~/configs/axios';
import { actionTypes } from '~/constants';
import { loadUser } from '~/helpers';

// Đây là dạng thunk fn, tức k có case 'LOGIN' trong reducer, nhưng vẫn dispath(login(data)) được và nó sẽ gọi dispatch khác -> vẫn có thể return sau khi dispatch tiếp action khác
export const login = (loginData) => async (dispatch) => {
    const responseData = await apis.login(loginData); // apis.login trả về response.data nếu k có lỗi gửi đi (luôn có dạng {err, msg, token}), còn khi có lỗi gửi request của axios sẽ là {err, msg}
    console.log(responseData);

    // dispatch(!responseData.err ? loginSuccess(responseData) : loginFail(responseData));

    // dispatch({
    //     type: actionTypes.SET_AUTH,
    //     payload: {
    //         isAuthenticated: !responseData.err ? true : false,
    //         authLoading: false,
    //         accessToken: responseData.accessToken, // gửi thành công thì có accessToken, lỗi thì undefined
    //         user: loadUser(responseData.accessToken), // phải await mới được, nên gọi await hàm bên ngoài rồi truyền vào -> nếu k nó là promise
    //         msg: responseData.msg,
    //     },
    // });

    // Phần loadUser này có hàm setAuthToken hình như redirect nó lại mất, phải set lại ở home?
    const user = await loadUser(responseData.accessToken); // accessToken null hay undefined vẫn được vì BE xử lý lỗi trả về msg rồi

    // SetAuth là action chung cho cả login success và fail, nên k cần if-else
    dispatch(setAuth(responseData, user)); // setAuth đang set là 1 action thông thường, nên không thể gọi await loadUser bên trong nó được (k await nó là promise k phải obj thường) -> buộc phải truyền vào dạng param
};

export const register = (registerData) => async (dispatch) => {
    const responseData = await apis.register(registerData);
    console.log(responseData);

    // Phần loadUser này có hàm setAuthToken hình như redirect nó lại mất, phải set lại ở home?
    const user = await loadUser(responseData.accessToken);
    dispatch(setAuth(responseData, user));
};

export const logout = () => {
    // setAuthToken(null); // phải bỏ set default request kèm token đi, k cần gọi loadUser mà chỉ setAuthToken thôi, vì user đc sửa lại bên dưới phần payload rồi k cần call api getUser
    // mà thực ra cũng k cần vì mỗi khi logout bị đẩy ra login, khi login/register (gửi kèm token của login lần trước vẫn được nếu BE k check gửi thừa như đang làm - token cũ k dùng nữa chắc k sao) thì lại setAuthToken mới rồi nên k cần null cũng được
    return {
        type: actionTypes.LOGOUT,
        payload: {
            // authLoading: true,
            isAuthenticated: false,
            accessToken: null,
            user: null,
            msg: '',
        },
    };
};

// action thông thường, được case trong reducer
export const setAuth = (response, user) => ({
    type: actionTypes.SET_AUTH,
    payload: {
        // authLoading: false,
        isAuthenticated: !response.err ? true : false,
        accessToken: response.accessToken, // gửi thành công thì có accessToken, lỗi thì undefined
        user: user,
        msg: response.msg,
    },
});

// const loginSuccess = (response) => ({
//     type: actionTypes.LOGIN_SUCCESS,
//     payload: response,
// });

// const loginFail = (response) => ({
//     type: actionTypes.LOGIN_FAIL,
//     payload: response,
// });
