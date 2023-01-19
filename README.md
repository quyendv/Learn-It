# Get started with LearnIt App - MERN Stack

Link tutorial for project [here](https://www.youtube.com/watch?v=rgFd17fyM4A&list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&index=11&t=5509s)

## Notes Backend

### Base

-   `npm i express jsonwebtoken mongoose dotenv bcryptjs cors` (Video dùng 'argon2' cho hash password, tự thay bằng 'bcryptjs')
-   `npm i -D nodemon`
-   `npm i @babel/core @babel/preset-env @babel/node` để import/export, thêm .babelrc và sửa 'dev' đi
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

-   Tham khảo [tourmaline_fs](https://github.com/quyendv/tourmaline_fs) chắc sẽ có ích

### Axios

-   Video hip06 [here](https://youtu.be/e8UZ4vupLB0?list=PLGcINiGdJE91fhdIYP2iQ5R2v0wWFrtyF)
-   Xem [tiktok-ui F8](https://github.com/quyendv/tiktok-ui)
-   Cái phần `Interceptor` để xử lý trước khi gửi và sau khi lấy đc data rất hay: áp dụng refresh_token tự động, ...
-   `dotenv` được cài sẵn trong create-react-app không cần cài thêm package nhưng đầu keyword phải là `REACT_APP`. Có thể dùng để lưu key REACT_APP_SERVER_URL
-   Dạng của response trả về: [response schema](https://axios-http.com/docs/res_schema)
-   Cách xác định dữ liệu trả về từ apiBE của [video hướng dẫn](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=7762): đoạn trycatch cực kì mới và hữu ích:

    -   Dạng của response nếu success (`!response.data.err` hoặc `response.data.success` tùy cài đặt) đã đính kèm link trên kia, nó là object có key data là cái ta cần quan tâm nhất
    -   Dạng của error khi nó trycatch được có 2 kiểu:
        -   Là lỗi trả về(vd 400, 404, ... đều coi là lỗi) sẽ có key `.response` và lúc này nó y hệt success, cũng có key `.data` là object dạng như { err: 1, msg: username is required } mà mình đã cài ở BE. => Ta return error.response.data ra mà xem
        -   Là lỗi khác (k rõ) thì `return error` đó ra, hoặc `return {err: 1, msg: error.message }`
    -   => Trong video LearnIt này cài đặt BE hơi khác mình (đang theo hip06) là { success: Boolean, message: ... } chứ k phải { err: Number err, msg: ... }. Vậy nếu để ktra nếu có lỗi không thì chú ý là `response.data.success` hay `!response.data.err` nhé

-   Gửi request
    -   VDL apis login dạng
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
-   Axios có thể set default 1 số thông tin, như khi login thì mặc định gửi token đi kèm các request khác: [video](https://youtu.be/rgFd17fyM4A?list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&t=9579), [docs: config default](https://axios-http.com/docs/config_defaults)

### Kết hợp redux và axios:

-   Xem lại code, hầu hết đã note hết lại
-   action login sẽ gọi api và dispatch action khác, từ action khác đó ta biết đc success hay failuer
