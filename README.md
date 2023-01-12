# Get started with LearnIt App - MERN Stack

Link tutorial for project [here](https://www.youtube.com/watch?v=rgFd17fyM4A&list=PL1rR0MZCkCGgrY9XCX1N1_YrhR78S-uuX&index=11&t=5509s)

---

## Notes Backend

---

### Base

-   `npm i express jsonwebtoken mongoose dotenv bcryptjs cors` (Video dùng 'argon2' cho hash password, tự thay bằng 'bcryptjs')
-   `npm i -D nodemon`
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

---

## Notes FrontEnd

---
