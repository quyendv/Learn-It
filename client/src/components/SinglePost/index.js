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
    const convertedStatus =
        status === postStatus.TO_LEARN ? 'toLearn' : status === postStatus.LEARNING ? 'learning' : 'learned';

    const handleDeletePost = (e) => {
        dispatch(deletePost(_id, accessToken));
    };

    const handleEdit = (e) => {
        dispatch(findPost(_id, posts));
        dispatch(setUpdatePostModal(true));
    };

    return (
        <div className={`singlePost flex min-h-[7.5rem] w-full gap-2 !rounded-md p-4 ${convertedStatus}`}>
            {/* Content */}
            <div className="flex flex-1 flex-col justify-between gap-1">
                {/* Title */}
                <span className="text-lg font-bold">{title}</span>
                {/* Status */}
                <span
                    className={`w-fit rounded bg-${convertedStatus} px-2 py-1.5 text-sm font-semibold tracking-wider`}
                >
                    {status}
                </span>
                {/* Description */}
                <p>{description}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-between gap-2">
                {/* Watch btn: phải là <a/> vì các url tutorial là bên ngoài web hiện tại, nếu set được vào trong thì mới dùng <Link/> */}
                <a href={url} target="_blank" rel="noreferrer">
                    <BsPlayBtn size={20} className="text-blue-600" />
                </a>
                {/* Edit btn: show update post modal */}
                <button onClick={handleEdit}>
                    <BsPencil size={20} className="text-green-600" />
                </button>
                {/* Delete btn */}
                <button onClick={handleDeletePost}>
                    <BsTrash size={20} className="text-red-500" />
                </button>
            </div>
        </div>
    );
}

export default SinglePost;
