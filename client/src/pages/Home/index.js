import Tippy from '@tippyjs/react';
import { useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css'; // optional
import Header from '~/components/Header';
import { CreatePostModal, UpdatePostModal } from '~/components/Modal';
import SinglePost from '~/components/SinglePost';
import { setCreatePostModal } from '~/stores/actions/modal';
import { getPosts } from '~/stores/actions/post';

/**
 * Nếu web của ta k dùng route '/' để render gì, tức khi vào sẽ chuyển đến login luôn, login thành công thì vào route khác như '/dashboard' thì ta chỉ cần return Navigate login luôn
 * Nếu web của ta dùng route '/' để render home mà k dùng route khác như trên:
 * - Ta phải check điều kiện (state auth có isAuthenticated true không), có thì render giao diện, k thì redirect như comment code bên dưới
 * - Hoặc ta đưa vào protectedRoute, mặc định layout đó đã check điều kiện rồi nên k phải check ở đây nữa
 *  // const auth = useSelector((state) => state.auth);
 *  // return auth.isAuthenticated ? <div>Home</div> : <Navigate to={routeConfig.login} />;
 */
function Home() {
    const { posts } = useSelector((state) => state.post);
    const { accessToken } = useSelector((state) => state.auth);
    const { showCreatePost, showUpdatePost, postSelected } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts(accessToken)); // Nếu lưu posts vào localStorage thì chỉ cần load data từ server lúc vào Home, k lưu thì page nào cần đều phải load
        console.log('render uef');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('render', { postSelected, posts });

    return (
        <div className="h-screen w-screen bg-home bg-cover bg-center bg-no-repeat">
            <Header />
            <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {posts.map((post) => (
                    <SinglePost key={post._id} data={post} />
                ))}
            </div>

            {/* Modal */}
            <CreatePostModal show={showCreatePost} />
            {/* Có post đc chọn update mới show, vì mình dùng postSelected cho value của form, để null bị lỗi */}
            {postSelected && <UpdatePostModal show={showUpdatePost} />}

            {/* Toggle CreatePost Modal Btn*/}
            <Tippy content="Add a new thing to learn">
                <div
                    className="absolute right-10 bottom-10 cursor-pointer text-red-500"
                    onClick={() => {
                        dispatch(setCreatePostModal(true));
                    }}
                >
                    <AiFillPlusCircle size={50} />
                </div>
            </Tippy>
        </div>
    );
}

export default Home;
