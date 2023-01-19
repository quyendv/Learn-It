import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '~/stores/reducers';

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist: ['navigation'], // demo thôi
// };
// const pReducer = persistReducer(persistConfig, rootReducer);

const reduxConfig = () => {
    // const store = createStore(pReducer, applyMiddleware(thunk)); // cách chung về root thì phải, node bookmark

    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);

    return { store, persistor };
};

export default reduxConfig;
