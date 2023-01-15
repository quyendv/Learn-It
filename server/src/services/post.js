import Post from '../models/Post';

export const createPost = ({ title, description, url, status }, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const newPost = new Post({
                title,
                description,
                url: !url ? undefined : url.startsWith('https://') ? url : `https://${url}`, // k nhập thì để undefined như desc, nhập thì luôn có dạng https://...
                status, // set default 'TO LEARN' ở model rồi, chỗ này k cần xử lý default nữa
                user: userId, // userId lấy từ req.userId truyền từ controller, gán ở middleware verifyToken -> chú ý field của model Post là user not userId
            });
            await newPost.save();
            resolve({
                err: 0,
                msg: 'Happy learning!',
                post: newPost,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getPosts = (userId, { page, limit, order, name, ...query }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Có nhiều cách, xem thêm trong readme.md và docs, phần select có thể dùng dấu '-' trước key để exclude vd như "-password"
            // const posts = await Post.find({ user: userId }).populate('user', ['username']);
            // const posts = await Post.find({ user: userId }).populate('user', 'username');
            // const posts = await Post.find({ user: userId }).populate({
            //     path: 'user',
            //     select: 'username',
            // });
            // const posts = await Post.find({ user: userId }).populate({
            //     path: 'user',
            //     select: ['username'],
            // });

            // -> Cập nhật thêm query, bên trên chỉ lấy hết thôi (order hiện tại làm như hip06 chỉ sort đc 1 field thôi, còn muốn sort nhiều field phải xử lý thêm sau)
            // VD: .../api/post?order[]=title&order[]=desc&limit=2&page=2&name='abc'&description=...&title=... tự custom đc  (sort để asc/desc, 1/-1 cũng ok, name mình set là search title theo contain substring name)

            if (name) query.title = { $regex: name, $options: 'i' }; //startsWith thì thêm ^ trước name (`^${name}`), endsWith thì thêm $ sau name (`${name}$`)

            const posts = await Post.find({ ...query, user: userId })
                .populate('user', ['username']) // populate chỉ là chỉnh là data join thôi nên để sau sort, limit cũng đc nhá
                .sort(order ? [order] : undefined) // có nhiều cách nhưng như này có vẻ tiện nhất khi order đã là mảng rồi, có thì truyền vào sort mảng các mảng là đc, k thì undefined sẽ k làm gì, (docs: https://mongoosejs.com/docs/api/query.html#query_Query-sort)
                .skip((!page || +page <= 1 ? 0 : +page - 1) * (limit || process.env.LIMIT_POST)) // chú ý skip(0) hoặc skip(undefined) thì đều cùng kết quả là k skip gì, nên check !page có thể return 0 * limit hay undefined đều được
                .limit(limit || process.env.LIMIT_POST);
            // -> hoặc sử dụng option của các hàm find: (filter, projection là các field muốn return và có thể để null nếu k yêu cầu gì, options là object { xem tại đây https://mongoosejs.com/docs/api/query.html#query_Query-setOptions })

            resolve({
                err: 0,
                response: posts,
            });
        } catch (error) {
            reject(error);
        }
    });

export const updatePost = ({ title, description, url, status }, postId, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            // Chú ý newPost là object chứ k đc sai là new Post({...}) -> tốt nhất nên gọi là newData tránh nhầm
            const newData = {
                title,
                description: description, // k nên xét || '', vì nếu k truyền vào sẽ thành '' trong khi mình muốn k nhập thì như cũ (tức để undefined nó sẽ k update)
                url: !url ? undefined : url.startsWith('https://') ? url : `https://${url}` || '', // k nhập gì sẽ undefined (update k cập nhật undefined), còn nhập phải dạng https://
                status,
            };

            const updateConditions = {
                _id: postId,
                user: userId,
            };

            const updatedPost = await Post.findOneAndUpdate(updateConditions, newData, { new: true }); // new true để trả về bản ghi sau update (mặc định false). Xem thêm: https://mongoosejs.com/docs/tutorials/findoneandupdate.html#getting-started
            // Có 2 TH:
            // + (!updatedPost) tức có thể post k tồn tại (notFound) hoặc user có userId nhận đc kia k có quyền xóa. => Nói cách khác k thấy Post nào có đồng thời postId và userId như trên
            // + (updatedPost) tức update thành công

            resolve({
                err: updatedPost ? 0 : 1,
                msg: updatedPost
                    ? 'Update post successfully'
                    : 'Update post failed. Post not found or user not authorized',
                post: updatedPost ? updatedPost : null,
            });
        } catch (error) {
            reject(error);
        }
    });

export const deletePost = (postId, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const deleteConditions = {
                _id: postId,
                user: userId,
            };

            // deleteOne/deleteMany để xóa, findOneAndDelete để xóa và trả về bản ghi cũ/mới tùy new:true/false
            const deletedPost = await Post.findOneAndDelete(deleteConditions);
            resolve({
                err: deletedPost ? 0 : 1,
                msg: deletedPost
                    ? 'Delete post successfully'
                    : 'Delete post failed. Post not found or user not authorized',
                post: deletedPost ? deletedPost : null,
            });
        } catch (error) {
            reject(error);
        }
    });
