import axios from 'axios';
import { apiUrl } from '~/constants';

const axiosInstance = axios.create({
    baseURL: apiUrl,
});

// Hàm helpers custom: chú ý dùng axiosIntance mình tạo chứ k phải config axios import từ 'axios' (nếu axios import thì là global rồi)
// export const setAuthToken = (accessToken) => {
//     if (accessToken) {
//         axiosInstance.defaults.headers.common['Authorization'] = accessToken; // BE mình cài trả về có cả Bearer rồi nên k cần thêm
//     } else {
//         delete axiosInstance.defaults.headers.common['Authorization'];
//     }
// };

// Add a request interceptor. Nhớ dùng instance ở đây, chứ k phải axios mặc định
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor. Nhớ dùng instance ở đây, chứ k phải axios mặc định
axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosInstance;
