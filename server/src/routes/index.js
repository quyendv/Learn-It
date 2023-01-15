const authRouter = require('./auth');
const postRouter = require('./post');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/post', postRouter);

    app.use('/', (req, res) => {
        res.send('Server on');
    });
}

module.exports = route;
