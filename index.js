const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const db = require('./config/mongoose-connection');
const indexRouter = require('./routes/index');

require('dotenv').config();

const app = express();

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SECRET_KEY
    })
);

app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const ownersRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productRouters');

app.use(cookieParser());

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', indexRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
