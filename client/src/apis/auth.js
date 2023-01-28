import axiosInstance from '~/configs/axios';

export const login = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            // const response = await axiosInstance.post('auth/login', data);
            const response = await axiosInstance({
                url: 'auth/login',
                method: 'POST',
                data: data,
                // headers: {
                //     'Content-Type': 'application/json',
                // },
            });

            // ** Nếu success tức !response.data.err (hoặc response.data.success) thì lưu thông tin cần (token, ...) vào localStorage thủ công. Mình dùng redux-persist nên k cần check
            // ** Trả dữ liệu về
            // resolve(response); // theo Hip06
            resolve(response.data);
        } catch (error) {
            if (error.response?.data) reject(error.response.data);
            else
                reject({
                    err: 1,
                    msg: error.message,
                });
        }
    });

export const getUser = (accessToken) =>
    new Promise(async (resolve, reject) => {
        try {
            // ** Xem cách gửi kèm token (nhưng mà mình sẽ set default gửi token kèm mỗi request luôn): https://flaviocopes.com/axios-send-authorization-header/
            // const response = await axiosInstance({
            //     url: 'auth/user',
            //     method: 'GET',
            //     headers: {
            //         Authorization: 'Bearer token',
            //     },
            // });

            // const response = await axiosInstance.get('auth/user') // hình như setAuthToken trước khi gọi hàm này nên k cần token cũng đc (ở hàm loadUser file helpers/index.js) -> nhưng mình chọn cách luôn gửi kèm token, k config default nữa
            const response = await axiosInstance.get('auth/user', {
                headers: {
                    Authorization: accessToken, // BE trả về AToken có Bearer rồi
                },
            });
            resolve(response.data);
        } catch (error) {
            if (error.response?.data) reject(error.response.data);
            else
                reject({
                    err: 1,
                    msg: error.message,
                });
        }
    });

export const register = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.post('auth/register', data);
            resolve(response.data);
        } catch (error) {
            if (error.response?.data) reject(error.response.data);
            else
                reject({
                    err: 1,
                    msg: error.message,
                });
        }
    });
