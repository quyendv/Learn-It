import * as apis from '~/apis';
import { actionTypes } from '~/constants';

// Get all posts
export const getPosts = (accessToken) => async (dispatch) => {
    const responseData = await apis.getPosts(accessToken);
    console.log(responseData);

    if (!responseData.err) {
        dispatch({
            type: actionTypes.POST_LOADED_SUCCESS,
            payload: responseData.posts || [], // cần xét mảng rỗng nếu posts là undefined do response trả về lỗi và k có key posts
        });
    }
};

// Add post
export const createPost = (data, accessToken) => async (dispatch) => {
    const responseData = await apis.createPost(data, accessToken);
    console.log(responseData);

    if (!responseData.err) {
        dispatch({
            type: actionTypes.CREATE_POST,
            payload: responseData.post,
        });
    }
    // return responseData; // return được, tuy nhiên nếu sau khi gọi api clg responseData ra sẽ là obj, còn return ở đây lại là 1 Promise và phải .then hay gì đó mới lấy được obj ra (khó hiểu vch)
};

// Del post
export const deletePost = (postId, accessToken) => async (dispatch) => {
    const responseData = await apis.deletePost(postId, accessToken);
    console.log(responseData);

    if (!responseData.err) {
        dispatch({
            type: actionTypes.DELETE_POST,
            payload: postId, // hoặc payload là responseData.post, nhưng mình nghĩ nếu chỉ check mỗi _id sẽ nhanh hơn là check toàn bộ key trong post để biết đc nó có phải cái cần xóa k
        });
    }
};

// Update post
export const updatePost = (data, accessToken) => async (dispatch) => {
    const responseData = await apis.updatePost(data._id, data, accessToken); // _id tự lấy từ data, vì chỉ sửa được thông tin như title, url, ... chứ _id không đổi nên lấy _id từ newData cũng là data cũ
    console.log(responseData);
    
    if (!responseData.err) {
        dispatch({
            type: actionTypes.UPDATE_POST,
            payload: responseData.post, // post được trả về là post mới đã được update, do BE config {new: true}
        });
    }
};
