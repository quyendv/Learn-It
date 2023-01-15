import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { notAuth } from './handleErrors';

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization; // Hoặc req.header('Authorization), chú ý có hay k có 's' trong 2 cách
    if (!token) return notAuth('Required authorization', res);

    const accessToken = token.split(' ')[1]; // Gửi lên có dạng `Bearer token`
    jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decode) => {
        // callback nhận err và decode (là 1 object chứa data đc jwt.sign và chứa iat, exp nữa. Muốn lấy field nào thì decode.key đó)
        if (err) {
            const isExpired = err instanceof TokenExpiredError;
            // invalid token
            if (!isExpired) return notAuth('Access token is valid', res, isExpired);
            // token is expired
            if (isExpired) return notAuth('Access token is invalid', res, isExpired);
        }

        // not err
        req.userId = decode.userId; // thêm key, dùng req.userId trong controllers/post hàm createPost (middleware sau verifyToken) sẽ dùng gán cho userId khi tạo post
        // Chú ý hơi khác chút so với Nodejs_hip06 vì project đó lấy hết thông tin user lưu vào req.user, còn mình chỉ muốn lấy userId phải decode.userId nữa (có thể gọi đặt biến decode bằng user như hip06 cũng đc)
        next();
    });
};

export default verifyToken;
