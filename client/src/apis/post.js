import axiosInstance from '~/configs/axios';

export const getPosts = (accessToken) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.get('/post', {
                headers: {
                    Authorization: accessToken,
                },
            }); // api/post/
            resolve(response.data);
        } catch (error) {
            reject(error.response?.data ? error.response.data : { err: 1, msg: 'Get posts failed from client' });
        }
    });

export const createPost = (data, accessToken) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.post('/post', data, {
                headers: {
                    Authorization: accessToken,
                },
            }); // /api/post/
            resolve(response.data);
        } catch (error) {
            reject(error.response?.data ? error.response.data : { err: 1, msg: 'Create post failed from client' });
        }
    });

export const deletePost = (postId, accessToken) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.delete(`/post/${postId}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            resolve(response.data);
        } catch (error) {
            reject(error.response?.data ? error.response.data : { err: 1, msg: 'Delete post failed from client' });
        }
    });

export const updatePost = (postId, data, accessToken) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.put(`post/${postId}`, data, {
                headers: {
                    Authorization: accessToken,
                },
            });
            resolve(response.data);
        } catch (error) {
            reject(error.response?.data ? error.response.data : { err: 1, msg: 'Update post failed from client' });
        }
    });
