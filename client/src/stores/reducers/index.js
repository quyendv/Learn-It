import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

// // VD có reducer muốn lưu localStorage
const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['accessToken', 'user'], // muốn lưu key những key này thôi (các key này thuộc initState của authReducer) -> blacklist ngược lại
};

const rootReducer = combineReducers({
    // key: reducer, // reducer bình thường, k muốn lưu
    auth: persistReducer(authConfig, authReducer),
});

export default rootReducer;
