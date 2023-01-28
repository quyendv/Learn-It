import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import modalReducer from './modal';
import postReducer from './post';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

// // VD có reducer muốn lưu localStorage
const authConfig = {
    ...commonConfig,
    key: 'auth',
    // whitelist: ['accessToken', 'user', 'isAuthenticated'], // muốn lưu key những key này thôi (các key này thuộc initState của authReducer), chú ý user k lưu password -> blacklist ngược lại
    // phải lưu ít nhất 1 key để biết rằng đã đăng nhập hay chưa, có thể dùng accessToken cũng được nhưng mình dùng isAuthenticated cho tường minh -> nên phải lưu vào để khi chạy app lấy được từ localStorage chứ k cần chạy lại data gì cả
};

const postConfig = {
    ...commonConfig,
    key: 'post',
};

const rootReducer = combineReducers({
    // key: reducer, // reducer bình thường, k muốn lưu
    auth: persistReducer(authConfig, authReducer),
    post: persistReducer(postConfig, postReducer), // Nếu lưu posts vào localStorage thì chỉ cần load data từ server lúc vào Home, k lưu thì page nào cần đều phải load
    modal: modalReducer,
});

export default rootReducer;
