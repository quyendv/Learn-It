import { actionTypes } from '~/constants';

export const setCreatePostModal = (isShow) => ({
    type: actionTypes.SET_CREATE_POST_MODAL,
    payload: isShow,
});

export const setUpdatePostModal = (isShow) => ({
    type: actionTypes.SET_UPDATE_POST_MODAL,
    payload: isShow,
});

// Set modal.postSelected when click, VD: editBtn (singlePost)
export const findPost = (postId, allPosts) => {
    const result = allPosts.find((post) => (post._id === postId));
    return {
        type: actionTypes.FIND_POST,
        payload: result,
    };
};
