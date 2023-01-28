import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatePostModal } from '~/stores/actions/modal';
import { createPost } from '~/stores/actions/post';
import ModalWrapper from './Wrapper';

function CreatePostModal({ show = false }) {
    // GlobalState
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // LocalState
    const [newPost, setNewPost] = useState({ title: '', description: '', url: '', status: 'TO LEARN' });

    // Fn
    const handleChangeNewPost = (e) => {
        setNewPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(newPost, accessToken)); // có thể gán bằng responseData (nếu action thunk fn có return), kết quả ở dạng Promise
        handleCloseModal();
        // show Toast message by Toastify
    };

    const handleCloseModal = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        dispatch(setCreatePostModal(false));
    };

    return (
        <ModalWrapper show={show} title="What do you want to learn?" onClose={handleCloseModal}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Form groups */}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="&nbsp;"
                        className="form-control"
                        id="title"
                        name="title"
                        value={newPost.title}
                        onChange={handleChangeNewPost}
                        required
                    />
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="&nbsp;"
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                        required
                        value={newPost.description}
                        onChange={handleChangeNewPost}
                    />
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="&nbsp;"
                        className="form-control"
                        id="url"
                        name="url"
                        value={newPost.url}
                        onChange={handleChangeNewPost}
                        required
                    />
                    <label htmlFor="url" className="form-label">
                        Tutorial URL
                    </label>
                </div>

                {/* Btn */}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-2 py-1 text-white transition hover:-translate-y-1 hover:opacity-80"
                    >
                        Learn It
                    </button>
                    <button
                        type="reset"
                        className="rounded-md bg-red-500 px-2 py-1 text-white transition hover:-translate-y-1 hover:opacity-80"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}

export default CreatePostModal;
