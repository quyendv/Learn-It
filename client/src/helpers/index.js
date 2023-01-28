import * as apis from '~/apis';
// import { setAuthToken } from '~/configs/axios';

/**
 * Đây là hàm helpers function
 * - Hàm thực hiện gọi api lấy thông tin user (trừ password) cài ở BE: lấy thông tin để set cho key user trong initState của authReducer. Và trả về thông tin đó
 * - Sau đó set default luôn gửi kèm token nếu có
 */
export const loadUser = async (accessToken) => {
    // setAuthToken(accessToken); // k dùng config default gửi token kèm vs request nữa, luôn tự ghi token vào
    const response = await apis.getUser(accessToken); // trả về response.data của axios rồi, truyền vào accessToken null/undefined vẫn ok
    return response.err ? null : response.user;
};
