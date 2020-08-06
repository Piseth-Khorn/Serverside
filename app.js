const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://root:root@cluster0.ifepn.mongodb.net/mydb?retryWrites=true&w=majority';
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routers/users');
const userone = require('./routers/user');
const fileUpload = require('./config/fileupload');
const cors = require('cors');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.once('open', function () {
    console.log('connected...');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res, next) => {
    res.sendFile('./ui/index.html', { root: __dirname });
});
app.get('/users/add', (req, res, next) => {
    res.sendFile('./ui/form.html', { root: __dirname });
});
app.use('/user', userone);
//app.use('/upload', fileUpload);
app.use('/uploads', express.static('uploads'));
app.listen(9000, function () {
    console.log('Server started')
});
