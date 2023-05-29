import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatePostModal } from '~/stores/actions/modal';
import { updatePost } from '~/stores/actions/post';
import ModalWrapper from './Wrapper';

function UpdatePostModal({ show = false }) {
    const { postSelected } = useSelector((state) => state.modal);
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // LocalState
    const [newPost, setNewPost] = useState({ title: '', description: '', url: '', status: 'TO LEARN' }); // default value

    useEffect(() => {
        // Do mình lưu state.posts trong localStorage nên có thể lấy data postUpdated qua postSelected bằng find
        // Nếu không mình sẽ tạo API bên BE lấy post theo id (hình như hàm getPosts của mình có config params để tìm rồi) rồi gọi trong uef của UpdatePostModal này, lưu vào state newPost kia
        setNewPost(postSelected); // ở đây k gọi api mà set bằng biến trong state
    }, [postSelected]); // thêm deps để tự cập nhật khi postSelected thay đổi

    // Fn
    const handleChangeNewPost = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost(newPost, accessToken));
        handleCloseModal();
        // show Toast message by Toastify
    };

    const handleCloseModal = () => {
        setNewPost(postSelected); // khi đóng modal thì những thay đổi chưa lưu sẽ bỏ đi, quay về data của post được chọn
        dispatch(setUpdatePostModal(false));
    };

    return (
        <ModalWrapper show={show} title="Making Progress?" onClose={handleCloseModal}>
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
                    <label htmlFor="title" className="form-label required">
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
                        value={newPost.description}
                        onChange={handleChangeNewPost}
                        required
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
                    <label htmlFor="url" className="form-label required">
                        Tutorial URL
                    </label>
                </div>
                <div className="form-group">
                    <select name="status" className="form-select" value={newPost.status} onChange={handleChangeNewPost}>
                        <option className="form-option" value="TO LEARN">
                            To Learn
                        </option>
                        <option className="form-option" value="LEARNING">
                            Learning
                        </option>
                        <option className="form-option" value="LEARNED">
                            Learned
                        </option>
                    </select>
                </div>

                {/* Btn */}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-2 py-1 text-white transition hover:-translate-y-1 hover:opacity-80"
                    >
                        Save
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

export default UpdatePostModal;
