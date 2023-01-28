import { BsPencil, BsPlayBtn, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { postStatus } from '~/constants';
import { findPost, setUpdatePostModal } from '~/stores/actions/modal';
import { deletePost } from '~/stores/actions/post';

function SinglePost({ data: { _id, status, title, description, url } }) {
    const { accessToken } = useSelector((state) => state.auth);
    const { posts } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    // LocalState
    const statusColor =
        status === postStatus.TO_LEARN ? 'toLearn' : status === postStatus.LEARNING ? 'learning' : 'learned';

    const handleDeletePost = (e) => {
        dispatch(deletePost(_id, accessToken));
    };

    const handleEdit = (e) => {
        dispatch(findPost(_id, posts));
        dispatch(setUpdatePostModal(true));
    };

    return (
        <div
            className={`h-[7.5rem] w-full rounded-md border-2 border-solid bg-[rgba(255,255,255,0.5)] p-4 shadow-2xl border-${statusColor}`}
        >
            {/* Title & Buttons */}
            <div className="flex">
                <span className="flex-1">{title}</span>
                <div className="flex items-center gap-2">
                    {/* Watch btn: phải là <a/> vì các url tutorial là bên ngoài web hiện tại, nếu set được vào trong thì mới dùng <Link/> */}
                    <a href={url} target="_blank" rel="noreferrer">
                        <BsPlayBtn size={20} className="text-green-600" />
                    </a>

                    {/* Edit btn: show update post modal */}
                    <button onClick={handleEdit}>
                        <BsPencil size={18} className="text-green-600" />
                    </button>

                    {/* Delete btn */}
                    <button onClick={handleDeletePost}>
                        <BsTrash size={18} className="text-red-500" />
                    </button>
                </div>
            </div>
            {/* Status */}
            <div className="mt-1">
                <span className={`rounded-full bg-${statusColor} px-1 text-sm font-semibold tracking-wider`}>
                    {status}
                </span>
            </div>
            {/* Description */}
            <div className="mt-2">
                <p>{description}</p>
            </div>
        </div>
    );
}

export default SinglePost;
