import { actionTypes } from '~/constants';

const initState = {
    posts: [],
    // postsLoading: true,
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.POST_LOADED_SUCCESS:
            return {
                ...state,
                posts: action.payload,
            };
        case actionTypes.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload], // payload is newPost
            };
        case actionTypes.DELETE_POST:
            // Xóa dùng splice hoặc filter, tuy nhiên chú ý (note trong readme rồi) là arrayName.splice(...) trả về mảng các element BỊ XÓA và thực hiện xóa/thêm element trên mảng gốc -> k gán originArray = originArray.splice(...)
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload), // payload is _id of deletedPost. Hoặc cài payload là deletedPost và set post !== payload
            };
        case actionTypes.UPDATE_POST:
            // Update dùng findIndex (sau đó sửa theo index) hoặc dùng map như bên dưới (note trong readme: Chú ý cách cập nhật array trong reducer)
            const newPosts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
            return {
                ...state,
                posts: newPosts,
            };
        default:
            return state;
    }
};

export default postReducer;
