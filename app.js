const express = require('express');
const mongoose = require('mongoose');
const roles = require('./routers/role');
const login = require('./privateRoute/author');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routers/users');
const userone = require('./routers/user');
const dotenv = require('dotenv');
const url = 'mongodb+srv://root:root@cluster0.ifepn.mongodb.net/mydb?retryWrites=true&w=majority';
dotenv.config();
const saltRounds = 10;
const myPlainTextPassword = 's0/\/\P4$$w0rD';
const someOtherPainTextPassword = 'not_bacon';
//const fileUpload = require('./config/fileupload');
const cors = require('cors');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.once('open', function () {
    console.log('connected...');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
app.get('/', (req, res, next) => {
    res.sendFile('./ui/index.html', { root: __dirname });
});
app.get('/users/add', (req, res, next) => {
    res.sendFile('./ui/form.html', { root: __dirname });
});
app.use('/auth', login);
app.use('/user', userone);
app.use('/role', roles);
app.use('/uploads', express.static('uploads'));
app.listen(9000, function () {
    console.log('Server started')
});
