import { actionTypes } from '~/constants';

const initState = {
    showCreatePost: false,
    showUpdatePost: false,
    postSelected: null, // Lưu data của post cần update/..., có thể optimize dùng biến này để check thay showUpdatePost/... luôn cũng được
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CREATE_POST_MODAL:
            return {
                ...state,
                showCreatePost: action.payload,
            };
        case actionTypes.SET_UPDATE_POST_MODAL:
            return {
                ...state,
                showUpdatePost: action.payload,
                // Nếu mà close modal thì có thể sẽ phải reset postSelected (nếu dùng cho updatedPost) thành null
            };
        case actionTypes.FIND_POST:
            return {
                ...state,
                postSelected: action.payload,
            };
        default:
            return state;
    }
};

export default modalReducer;
