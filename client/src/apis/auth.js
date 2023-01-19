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
            if (error.response.data) reject(error.response.data);
            else reject({ err: 1, msg: error.message });
        }
    });
