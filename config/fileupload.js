const express = require('express');
const router = express.Router();
const multer = require('multer');
var mess = '';
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        callback(null, date + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    // reject file 
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true);

    } else {
        callback(null, false);
        mess = 'png is allowed ';
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.post('/', upload.single('file'), async (req, res, next) => {

    try {
        console.log(req.file);
        res.json({
            'status': 'ok',
            'content': 'File upload success'
        });
    } catch (err) {
        res.send('Something went wrong ' + err);
    }
});

module.exports = upload;