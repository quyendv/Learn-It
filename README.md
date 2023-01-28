# Get started with LearnIt App - MERN Stack

Link tutorial for project [here](https://www.youtube.com/watch?v=rgFd17fyM4A&list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&index=11&t=5509s)

## Notes Backend

### Base

-   `npm i express jsonwebtoken mongoose dotenv bcryptjs cors` (Video dùng 'argon2' cho hash password, tự thay bằng 'bcryptjs')
-   `npm i -D nodemon`
-   `npm i -D @babel/core @babel/preset-env @babel/node` để import/export, thêm .babelrc và sửa 'dev' đi
-   Config package.json: 'dev', 'start', 'main'
-   Setup file server.js
-   Setup cloud mongoDb (dùng compass hình như chỉ local thôi), để ý đoạn thêm cluster name nếu k nó để mặc định ấy
-   Config connect database:

    -   Chú ý hàm connectDB, và set cái strictQuery kia thành false để nó k warning ở console (do có thay đổi từ bản mongoose 7 thì phải, trước làm F8 k thấy)

    -   Để ý string connect phải đc encode url (vd có kí tự đặc biệt !, %, ...). Tra code tại [đây](https://www.w3schools.com/tags/ref_urlencode.ASP). Hoặc dùng encodeURIComponent() của javascript để tự encode. => Có điều thử mà k thấy đúng với mấy kí tự !, ... Tốt nhất dùng kí tự thường thôi

### Models

-   Tạo Schema sau đó export

    > module.exports = mongoose.model('nameModelAsTableInMySQL', nameSchemaCreated)

    Chú ý:

    -   Trong MySQL thì có database chứa nhiều `Table`, còn MongoDB có database chứa nhiều `Collection`
    -   Trên code thì ta có `model`, VD User, Book, ... còn trên db ta có `table/collection` và thường thêm 's' như Users, Books, ...
    -   Tên file model có thể viết hoa hoặc không (tùy quy ước) nhưng tên model nên viết hoa (k biết viết thường lỗi k nhưng quy ước rồi) và tên table/collection là tên model dạng số nhiều

-   Enum trong model: `enum: [value1, value2, value3]; default: value1;`. [Xem thêm](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=1130)

-   `Populate` sử dụng từ khóa `ref` để liên kết tới model khác, gần giống như associate của sequelize. Xem thêm [docs](https://mongoosejs.com/docs/populate.html#saving-refs)

    > user: { type: Schema.Types.ObjectId, ref: 'User' }

    Giá trị của ref nhận là `modelName` chứ k phải collection. Chú ý thêm cái `Schema.Types.ObjectId`

### Routes

-   Tạo và export function trong routes/index.js
    > route(app) { app.use('/api/auth', authRouter); app.use('/', (req, res) => res.send('Server on')); }
-   Tạo các authRouter, postRouter, ... Chú ý học cách cmt route cho dễ bảo trì

### Controllers kèm Services

-   Tạo các controllers
    -   Cài `@babel/core @babel/preset-env @babel/node`, cài đặt và custom error bằng `http-errors`
    -   Controller sẽ chỉ validate input form, sau khi input hợp lệ thì gọi services xử lý như Nodejs_hip06
-   Validate bằng `joi`, còn xử lý dữ liệu bằng services/...
    -   Cách tạo schema và validate với joi [here](https://joi.dev/api/?v=17.7.0)
    -   Xem thêm rule cho [email](https://www.w3resource.com/javascript/form/email-validation.php) và [password](https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/)
-   Auth
    -   Hiện tại mình chưa biết có hàm nào tương tự như findOrCreate như sequelize không, tìm k thấy. Nên sẽ xử lý minh bạch theo kiểu tìm bản ghi bằng findOne và nếu chưa có thì lưu bằng save() rồi tạo luôn accessToken vs jwt.
    -   Bị lỗi cc gì phải cấu hình lại cái atlas, xóa project đi cài lại, cay vc
    -   Thêm api getUser nhưng k trả về password (vì response trả về bị lộ)
    -   RefreshToken để sau, làm tương tự như bên SERN thôi
-   Post

    -   Chú ý lỗi khi chỉ muốn validate 1 input nào đó thì k đc truyền cả req.body mà phải là validate({key: req.body.field cần lấy}). Bị sai lỗi truyền validate(req.body.field)
    -   Phần verifyToken, jwt.verify có tham số thứ 3 là `callback(err, decode)`, hip06 ta đặt decode thành user và gán req.user = user (muốn lấy key nào của user thì .key đó thôi). Còn trong project này ta lại chỉ lấy `userId` (key trùng với key khi `jwt.sign`) thì có thể gán req.userId = decode.userId (key trùng với key khi `jwt.sign`). Hoặc vẫn đặt decode là user và gán req.user = user, sau đó lấy id thì dùng `req.user.userId` thôi (dùng khi tạo `Post` cần field `user`(trong model) là key `userId` của req). Xem [docs](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)
    -   GetPosts muốn lấy như join các bảng trong sql thì xem đoạn [này](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=4429)
    -   UpdatePost: hàm findOneAndUpdate của mongoose cũng chỉ update field nhập vào thôi thì phải, chú ý lỗi truyền vào newData (dạng object) chứ k phải new Post(...)

-   API populate: [docs](https://mongoosejs.com/docs/populate.html#population) (xem toàn bộ Populate cho đầy đủ). VD:

        - `const posts = await Post.find({ user: userId }).populate('user', ['username']);`

        - `const posts = await Post.find({ user: userId }).populate('user', 'username');`
        - `const posts = await Post.find({ user: userId }).populate({
                    path: 'user',
                    select: 'username',
                });`
        - `const posts = await Post.find({ user: userId }).populate({
                path: 'user',
                select: ['username'],
            });`

    -   `select` có thể nhận key có dấu `'-'` để exclude nó, vd: `select: ["-password"]`, hoặc viết kiểu gọn như cách 1, 2 tương tự
    -   Ngoài ra còn có 1 số key khác như:
        `populate({ path: ..., select: ..., options: { limit: 2 }, ... tự đọc thêm })`
    -   => Tức `populate` nhận đối số path (đối số 1 nếu viết rút gọn như 2 cách đầu) là cái key như khóa ngoại (chứa ref) của Model đang gọi find, thứ 2 là danh sách các key muốn lấy của bảng còn lại được join. Như vậy, nó sẽ chuyển từ key khóa ngoại: value thành key khóa ngoại: { .. }.
    -   Operators so sánh: [here](https://www.mongodb.com/docs/manual/reference/operator/query/)
    -   Các option sort, limit, ... [here](https://mongoosejs.com/docs/queries.html)
    -   new, upsert, ... [here](https://mongoosejs.com/docs/tutorials/findoneandupdate.html#getting-started)

### Test api

-   Nếu test bằng file .rest thì để ý một số lỗi hay gặp
    -   `SyntaxError: Unexpected token } in JSON at position...` thì khả năng do thừa dấu `','` ở element cuối trong object gửi đi
    -   Lỗi validate joi đôi khi k có msg. Do truyền `.validate(req.body.field` duy nhất muốn set`)`. Phải là `.validate({key: req.body.field})`
    -   Trả về obj rỗng mà k có err hay msg gì: xem lại có thiếu await trước các hàm async như services.someFn không
    -   `"code": 66, "codeName": "ImmutableField"` ở phần updatePost là do mình sai phần newPost cần update lại thành 1 object {title, des, ...} chứ k phải là new Post(...) -> nên dùng newData tránh nhầm
    -   Sai chính tả: params not param, ... nhiều khi vẫn chạy k ra lỗi đâu, tự để ý

### Bổ sung:

-   Video chưa check url trước khi dùng url.startsWith (create và update) vì nó có thể undefined do k check required, xử lý đơn giản nhất là thêm required() cho joi check (nhưng nhiều lúc người dùng k có link, lúc đó sẽ phải nhập rỗng), k thì phải có default value trong model(cho cả desc nữa), hoặc thêm check url trước khi startsWith

    -   Sửa lỗi trên: k thêm default vào model hay joi required, nếu k nhập thì để undefined (mongoose sẽ k save hay update field nào undefined), còn đối vs url nếu nhập phải dạng https://...

-   Bổ sung getPosts thêm nhiều thông tin hơn như nodejs_06: thêm [limit](https://mongoosejs.com/docs/api/query.html#query_Query-limit), [sort](https://mongoosejs.com/docs/api/query.html#query_Query-sort), pagination như bên sern hip06
    ```
        if (name) query.title = { $regex: name, $options: 'i' };
        const posts = await Post.find({ ...query, user: userId })
        .populate('user', ['username'])
        .sort(order ? [order] : undefined)
        .skip((!page || +page <= 1 ? 0 : +page - 1) * (limit || process.env.LIMIT_POST))
        .limit(limit || process.env.LIMIT_POST);
    ```
    -   `name` hiện search title theo substring, startsWith thì sửa ^name, endsWith thì name$, các [$options khác] (https://www.mongodb.com/docs/manual/reference/operator/query/regex/#-regex) (có note kĩ cách dùng trong ảnh JS/Nodejs/mongoose/operators...) k cần nhớ lắm, nhớ mỗi i: insensitive (k check chữ hoa thường)
    -   `populate` chỉ chỉnh lại data khóa ngoại nên để sau cùng cũng k sao
    -   `sort` nên dùng trước rồi mới đến `skip` rồi `limit`, nếu đổi thứ tự linh tinh sẽ sai đấy, vì bản chất là sort xong mới skip theo offset và trả về limit bản ghi
    -   các hàm `find` như find, findOne, ... thường có dạng (filter search, column muốn return, options dạng object chứa các key trong [docs](https://mongoosejs.com/docs/api/query.html#query_Query-setOptions)) nên có thể dùng kiểu find(filter, null nếu k yêu cầu gì, { sort: ..., limit: ..., ...})
-   Bổ sung deletePost muốn delete nhiều post thì truyền 1 mảng postIds vào, tự làm như nodejs_06 đã làm mẫu rồi
    -   Phần filder ta chỉ cần key: arrayIds vì mongoose tự thêm $in như sequelize rồi [docs](https://mongoosejs.com/docs/tutorials/query_casting.html#implicit-in)
    -   Bổ sung operators khác [docs](https://www.mongodb.com/docs/manual/reference/operator/), [more](https://www.bmc.com/blogs/mongodb-operators/)

### Chốt lại CRUD: (đối với post trong project này hay book trong hip06)

-   create thì POST api/post/
-   get (có thể nhiều post) thì GET api/post/ (có thể nhận thêm query khác để filder)
-   update 1 post thì PUT api/post/:id (truyền vào param hoặc body cũng k sao)
-   delete (có thể nhiều post) thì DELETE api/post/:id ... nếu mình chỉ muốn xóa 1 (như video dạy project này), còn xóa tổng quát 1 hoặc nhiều thì sẽ là api/post/ và truyền mảng id và userId (k truyền, có đc từ jwt) tương ứng vào request gửi đi (như hip06)
    -   Tự sửa thêm xóa nhiều nhé, thêm route deleteMany cũng được đỡ phải sửa lại
    -   Chú ý req.params not param, lỗi k hiện, chạy bth nhưng sai

## Notes FrontEnd

### Base

-   `npm i axios react-router-dom`, ngoài ra video có dùng thêm `bootstrap react-bootstrap` nữa mà mình k dùng, cài `tailwind` (css chay cũng được nhưng mình nghĩ project này mục đích chính là cài đặt api và gọi ở FE nên giao diện làm sao cho nhanh nhất là được)
-   Cài đặt `GlobalStyle` bằng `index.scss`, thêm `customize-cra, babel-plugin-module-resolver`, còn `normalize` nếu dùng `tailwind` thì thôi k cần cài (thậm chí có thể k cài `sass`), `lint staged, husky` k cần thiết vì làm nhóm mới cần những thứ đó, prettier + eslint mình cài global rồi. `.vscode/...` sẽ cần nếu làm team
    -   `npm i -D customize-cra react-app-rewired babel-plugin-module-resolver sass tailwindcss prettier prettier-plugin-tailwindcss` (scss chỉ dùng cho dev khi build ra css, prettier cần tải cho sort class của tailwind `prettier-plugin-tailwindcss`).
    -   Và `npx tailwindcss init`
    -   Copy .babelrc, jsconfig.json, config-overrides.json, sửa package.json phần start, build, test
    -   Thêm `@tailwind base; @tailwind components; @tailwind utilities;` vào file css global và thêm các config base cần thiết vô (hầu hết trùng vs tailwind rồi)
        -   Thêm `text-rendering: optimizeSpeed` cho body
        -   Thêm `button, input, [tabIndex] { border: none; outline: none; }`
        -   Thêm `svg { display: inline-block }` chung cho `react-icons` nếu tải, mặc định là block xuống dòng (do tailwind thì phải).
    -   Sửa file tailwind.config.js, copy file .prettierc, prettier.config.js để format code tailwind
    -   Mở commit cài tailwind ở `FE_Effects` mà làm theo cho dễ

### Cấu hình routes, tạo page login/register

-   Không tập trung vào phần giao diện nên tự xem
-   Chú ý cách dùng `<Navigate />` để link đến trang khác
-   ProtectedRoute:
    -   Có thể tạo component như layout (bọc lấy element của Route) check trước khi trả về children (hoặc Outlet tùy config): [vilbo](https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2#_11-protected-routes-21)
    -   Hoặc có thể tạo component ProtectedRoute trả về `<Route {...props} element={check đk} />` : [video](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=10860). Tuy nhiên cách này k dùng được do bản cũ rồi sao ấy

### Redux

-   Video hướng dẫn project này k dùng redux, nên tự học cách cài
-   Tham khảo 2 trang tiếng việt tóm tắt về redux (note trong bookmark redux): [redux](https://viblo.asia/p/hoc-react-redux-trong-15-phut-1Je5E7q0ZnL), [redux-thunk](https://viblo.asia/p/tim-hieu-ve-redux-thunk-Qbq5Qkm4ZD8#_2-vay-redux-thunk-la-gi-1)
-   Video clone zingmp3 có cấu hình react-redux [here](https://www.youtube.com/watch?v=heaqlV0nTFc&list=PLGcINiGdJE91fhdIYP2iQ5R2v0wWFrtyF&index=5), ta sẽ làm theo video này là chính
-   Cài đặt và cấu hình:

    -   `npm i redux react-redux redux-thunk`, chú ý không nhầm với react-thunk
    -   Tạo src/store bên trong chứa actions/ và reducers/, có thể thêm constants/ chứa file actionsType hoặc đưa file đó vào actions/ cũng được
    -   Viết các actions và reducers, sau đó tạo reducers/rootReducer.js hoặc reducers/index.js cũng đc, bên trong combineReducers({key: reducer, ...}) rồi export ra
    -   Tạo thêm utils/redux.js hoặc configs/redux.js hoặc helpers hay folder gì đấy tùy mình, bên trong config theo đoạn video [này](https://youtu.be/heaqlV0nTFc?list=PLGcINiGdJE91fhdIYP2iQ5R2v0wWFrtyF&t=1173)
        -   Tạo 1 `function reduxConfig` bên trong cấu hình store, persistent(để sau) như bên dưới (vì là fn nên phải gọi hàm lấy value)
        -   Tạo `store = createStore(rootReducer, applyMiddleware(thunk))` với thunk là có thể viết đc actions dạng {type: ..., payload: ...} và payload có thể là 1 hàm, 1 response gọi api (`Async action`) thay vì 1 giá trị cụ thể nào đó như `plain javascript object` thông thường. Tự xem docs
    -   Trong src/index.js gọi hàm reduxConfig lấy store, truyền vào `<Provider />` của react-redux
    -   `redux-thunk` đã note config ở trên, tuy nhiên cách cài đặt actions sẽ khác:
        -   [Docs](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#fetching-todos-from-a-server), [Vilbo](https://viblo.asia/p/tim-hieu-ve-redux-thunk-Qbq5Qkm4ZD8#_2-vay-redux-thunk-la-gi-1)
        -   [Tourmaline làm mẫu](https://github.com/quyendv/tourmaline_fs/blob/main/ClientApp/src/store/actions/auth.js), xem cả actions và reducers cho hiểu bao quát rõ ràng
    -   `redux-persist`: Phần này hơi khó hiểu, và cũng chưa cần áp dụng nếu project ít state (ít state redux cũng k nên dùng luôn)
        -   Làm theo video này [phút 20](https://youtu.be/jNh3Jvj6egY?list=PLGcINiGdJE91fhdIYP2iQ5R2v0wWFrtyF&t=1219)
        -   Note trong [bookmark](https://viblo.asia/p/luu-redux-state-vao-local-storage-voi-redux-persist-3P0lPezv5ox) và xem [docs](https://www.npmjs.com/package/redux-persist)
        -   Tự làm theo video và trang hướng dẫn, chưa chắc chắn nên chưa note lại
        -   Cực chú ý: chính tả và đường dẫn, vì nó có nhiều đường dẫn trùng nhau sao ấy

-   Chú ý: trong action dạng thunk function, khi dispatch tiếp 1 action khác, ta vẫn có thể return value sau đó được, nhưng nếu value đó là response của 1 api nào thì nó sẽ dạng Promise, cái này có thể dùng để xem xét sau khi gọi action kết quả như thế nào (login, register, ...)

-   Tham khảo [tourmaline_fs](https://github.com/quyendv/tourmaline_fs) chắc sẽ có ích

### Axios

-   Video hip06 [here](https://youtu.be/e8UZ4vupLB0?list=PLGcINiGdJE91fhdIYP2iQ5R2v0wWFrtyF)
-   Xem [tiktok-ui F8](https://github.com/quyendv/tiktok-ui)
-   Cái phần `Interceptor` để xử lý trước khi gửi và sau khi lấy đc data rất hay: áp dụng refresh_token tự động, ...
    -   Nhưng nếu dùng axios instance phải dùng instance đó để set chứ k phải axios import từ 'axios'
-   `dotenv` được cài sẵn trong create-react-app không cần cài thêm package nhưng đầu keyword phải là `REACT_APP`. Có thể dùng để lưu key REACT_APP_SERVER_URL
-   Dạng của response trả về: [response schema](https://axios-http.com/docs/res_schema)
-   Cách xác định dữ liệu trả về từ apiBE của [video hướng dẫn](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=7762): đoạn trycatch cực kì mới và hữu ích:

    -   Dạng của response nếu success (`!response.data.err` hoặc `response.data.success` tùy cài đặt) đã đính kèm link trên kia, nó là object có key data là cái ta cần quan tâm nhất
    -   Dạng của error khi nó trycatch được có 2 kiểu:
        -   Là lỗi trả về(vd 400, 404, ... đều coi là lỗi) sẽ có key `.response` và lúc này nó y hệt success, cũng có key `.data` là object dạng như { err: 1, msg: username is required } mà mình đã cài ở BE. => Ta return error.response.data ra mà xem
        -   Là lỗi khác (k rõ) thì `return error` đó ra, hoặc `return {err: 1, msg: error.message }`
    -   => Trong video LearnIt này cài đặt BE hơi khác mình (đang theo hip06) là { success: Boolean, message: ... } chứ k phải { err: Number err, msg: ... }. Vậy nếu để ktra nếu có lỗi không thì chú ý là `response.data.success` hay `!response.data.err` nhé

-   Gửi request

    -   Lưu ý: khi url api dạng .../api/auth/login, nếu set baseUrl là .../api (k có '/' ở cuối) thì khi gửi request truyền url là 'login' hay '/login' đều vẫn được. => Tức mình có thể k cần '/' mà aixos tự hiểu sao ấy

    -   VD apis login dạng
        -   `const response = await axiosInstance.post('auth/login', payload)`
        -   ```
              const response = await axiosInstance({
                  url: 'auth/login',
                  method: 'POST',
                  data: payload,
                  // headers: {
                  //     'Content-Type': 'application/json',
                  // },
              });
            ```
    -   Gửi kèm header authorization [here](https://flaviocopes.com/axios-send-authorization-header/)

        -   ```
                const response = await axiosInstance({
                    url,
                    method: ...,
                    data,
                    headers: {
                        Authorization: 'Bearer token'
                    }
                })
            ```
            hoặc
            ```
                const response = await axiosInstance.post(url, data nma nếu là get thì BỎ QUA tham số này đc, {
                    headers: {
                        Authorization: 'Bearer token'
                    }
                })
            ```
        -   Tuy nhiên ta sẽ làm theo cách set default để luôn gửi kèm token ở mỗi request

-   Axios có thể set default 1 số thông tin, như khi login thì mặc định gửi token đi kèm các request khác: [video](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=9579), [docs: config default](https://axios-http.com/docs/config_defaults)
    -   Như vậy sau khi login xong, token sẽ lưu vào localStorage, đồng thời login success sẽ gọi hàm set default cho header gửi kèm token, ngược lại nếu token k có phải xóa luôn đi default đó. Sau này gửi request khác đều không phải send lại token.
        -   Nhưng để ý token server trả về có `Bearer ...` hay chưa (làm theo hip06 thì có, video này thì không), nếu có thì cứ gửi thôi, k thì phải thêm vào cùng với token để gửi đi
        -   Và đặc biệt nếu dùng axios instance phải dùng instance đó để set, giống như `Interceptor` ở trên
    -   Ngoài default cho headers.common['Authorization'] ra còn có thể config default cho baseURL, ... Xem trên docs
    -   UPDATE: Vấn đề là khi login xong, setAuthToken rồi nhưng redirect đến '/' - Home sẽ lại mất, cần phải set lại trong useEffect
        -   Tham khảo [stackoverflow](https://stackoverflow.com/questions/54637071/axios-default-headers-cleared-after-page-refresh-in-react-js)
        -   Hướng giải quyết có vẻ là luôn set lại nếu page reload (có thể bằng useEffect) hoặc dùng `Interceptor` (nhưng nhữn request k cần token như login, register lại k hợp lý và có thể rò rỉ, mặc dù thừa token vẫn chạy nếu BE k check gửi thừa như mình đang làm - à mà khi logout thì login gửi kèm token cũ đã bỏ chắc k sao). Hoặc nữa là luôn set lại ở những page đó khi reload (có thể dùng useEffet)
        -   Chọn gửi kèm token cho lành, đỡ config phức tạp rườm rà

### Kết hợp redux và axios:

-   Xem lại code, hầu hết đã note hết lại
-   action login sẽ gọi api và dispatch action khác, từ action khác đó ta biết đc success hay failuer
-   authReducer có thông tin `user` được gọi qua api, vậy nên trước khi gán ta phải await loadUser đã (trong actions/auth.js) nếu k nó sẽ là promise k lưu vào localStorage được (nếu k lưu được thì khi token chưa hết hạn tức chưa phải login lại <nếu chưa xét đến refreshToken> sẽ khó lấy `user`, chỉ có luôn gọi khi dùng hoặc login lại)
-   Video làm là vào trang '/' sẽ chuyển đến '/login', sau khi login thành công thì đến '/dashboard', tuy nhiên mình thích check đk ở '/' nếu chưa thì đến login còn login rồi thì quay về home với giao diện home được render ra như dashboard
    -   Chính vì vậy phải check login chưa bằng cách lưu accessToken hoặc isAuthenticated vào localStorage (bằng redux-persist), vì khi khởi động app nó sẽ lấy thông tin đó để ktra chứ k phải chạy lại dữ liệu gì cả
    -   Ban đầu tự làm là khi bấm login (useEffect gọi khi auth thay đổi) ta sẽ check nếu đăng nhập thành công thì chuyển đến '/', '/home' hoặc '/dashboard' gì tùy, còn lỗi thì hiện thông báo lỗi ra giao diện người dùng (chưa làm cái này). Tuy nhiên xem [video](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=10258) thì thấy nên gộp lại và check điều kiện ở layout Auth chứa cả page Login và Register, như vậy sẽ đúng và tiện hơn khi k phải lặp code ở các page Auth/....

### Link dữ liệu FE và BE:

-   BE buộc phải có 1 cấu trúc cố định, VD hiện tại thường là {err, msg, ...} nếu true thì có thể có thêm accessToken (thường là login, register thôi), user/post/... nhưng sau nên đổi thành response là đúng nhất, dễ lấy

### Modal

-   Khi close nhớ clear input value đi, nếu k lần sau mở vẫn giữ state value cũ

### Chú ý cách cập nhật array trong reducer

-   Trong reducer nếu state chứa array, ta sẽ phải xử lý thêm xóa phần tử (đã note trong phần cơ bản nhưng phải nhắc lại)
    -   Add: dùng spread thêm vào cuối đơn giản nhất
    -   Delete: có dùng filter hoặc splice, tham khảo [stackoverflow](https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array)
        -   Nếu dùng splice phải để ý, arrayName.splice(..) nó sẽ thực hiện xóa và thêm element trên array gốc, đồng thời trả về 1 mảng array `BỊ XÓA`, vậy nên `KHÔNG` đc gán `originArray = originArray.splice(...)`. Xem kĩ tại [mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
    -   Update:
        -   Tìm index khớp với index của newElement cần update, sau đó sửa theo index: array[index] = newElement. Tham khảo [stackoverflow](https://stackoverflow.com/questions/35206125/how-can-i-find-and-update-values-in-an-array-of-objects)
        -   Hoặc dùng map, cũng tương tự, xem [video](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=18863)

### Chưa xử lý:

-   Hình như mỗi lần chạy lại app đều phải loadUser lại để nó set default cho axios (mà k biết cho axios hay axios instance)
-   Do code khác video nên chưa làm đc cách chuyển sang trang khác load 1 lúc, mới chỉ biết navigate về, loading tạm để sau
-   Khi xóa user thì phải xóa post của user đó đi nữa
-   Mình code sau khi gọi dispatch(login/register) thì đều thực hiện loadUser (load thông tin user, và set authorization default cho axios instance) tuy nhiên việc load thông tin thì ok, nhưng việc setDefault thì k đc khi reload lại (lần đầu login/register sau đó redirect đến home thì ok, nhưng reload lại mới lỗi)
    -   Có vẻ như mỗi lần reload lại page đều cần set default 1 lần ?? Nên việc login xong setAuthToken rồi chuyển đến '/' thì ok nhưng reload lại cái là mất phải set lại
    -   Hoặc ở path root '/' - Home phải set token (useEffect) mới hiệu quả chứ k phải sau khi redirect đến '/' chăng ?
    -   Hoặc cho chắc, luôn gửi kèm token thay vì set default
    -   UPDATE: Note ở phần `Axios` bên trên, [stackoverflow](https://stackoverflow.com/questions/54637071/axios-default-headers-cleared-after-page-refresh-in-react-js)
-   Thêm Toastify sau khi thực hiện thành công api nào đó: addPost, delPost, ...
-   Sửa giao diện home khi chưa có post nào

## Deployment

-   Video gốc dùng heroku cho BE (k còn free nữa), và netlify cho FE. Trong hầu hết các video fullstack khác đều thấy như thế, nhưng do heroku có thể lồng client và server vào 1 project mà giờ nó hết hạn nên ta có thể lại tách ra thành 2 project FE và BE rồi đẩy lên github (mà để nguyên vẫn đc sao ấy)
    -   Video gốc chỉ nên tham khảo phần FE, BE với heroku auto bỏ, k còn free nữa
    -   Phần deploy FE với Netlify có thể tham khảo cách kéo thả /build trong phần cuối [video này](https://youtu.be/khcjRUZCufs?t=7489)
    -   Phần deploy BE có lựa chọn khác của hip_06 bằng vercal theo [video này](https://www.youtube.com/watch?v=mvuGRhXeCNo)
-   Ngoài video này còn 2 video khác của hoidanit (note trên bookmark chrome 'Deploy') dùng vercal cho FE và render cho BE
    -   [FE](https://www.youtube.com/watch?v=ncV0OEa9GoQ) & [BE](https://www.youtube.com/watch?v=NkulG9hH2LI)
-   FE deploy có vẻ dễ hơn, nhiều tutorial, BE thì có thể tham khảo thêm [Fly](https://fly.io/), [Railway](https://railway.app/), [Cyclic](https://www.cyclic.sh/)

### Chốt lại

-   Deploy BE bằng render theo hoidanit(hoặc tài liệu khác), FE theo Vercal
    -   Cách giúp deploy BE nhanh hơn: [video](https://youtu.be/NkulG9hH2LI?t=763). Có vẻ là cách 2 của freecodecamp note bên trên
-   Cài đặt lại:
    -   Ẩn .env đi, push .env.example hay gì đó tùy, khi deploy các PaaS (Plastform as a Service) sẽ yêu cầu nhập biến môi trường sau
        -   Nếu đã add .env rồi phải remove theo cách trên [stackoverflow](https://stackoverflow.com/questions/38983153/git-ignore-env-files-not-working)
        -   Cụ thể: đứng ở root ( learn-it> ): git rm server/.env --cache
    -   Sẽ phải sửa phần CLIENT_URL của cors, phần baseURL của axios, ... nói chung các url phải sửa lại
    -   Test trước các lệnh start, build, ... trước khi deploy vì lỗi có thể còn tồn tại, check local rồi sửa luôn
        -   Bị lỗi cái server, run dev chạy đc mà start lại lỗi, do cái babel-node ấy.
            -   Dùng 1 loại thôi, ưu tiên ES6 (import) và để type: module trong package.json. Tham khảo [stackoverflow](https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module)
            -   Cấu hình babel theo [freecodecamp](https://www.freecodecamp.org/news/setup-babel-in-nodejs/) phần config package.json, nhớ git ignore /build đi. Chưa thử, nhưng nếu làm theo y nguyên có lẽ được
            -   Mình thấy hip06 cài cả start chạy nodemon và babel-node y hệt như run dev, chắc chắn sẽ k tốt bằng 2 cách bên trên vì cả docs babel-node cũng khuyến cáo k nên dùng trong production. Repos [phongtro123](https://github.com/hip06/fullstack-phong-tro-123) phần /server/package.json để tham khảo
            -   => Mình sẽ để nguyên theo cách số 3, nhưng sẽ rút kinh nghiệm cho các project sau

### Đến phần

-   Tạo model create post: https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=15982
-   Deploy: https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=20576
