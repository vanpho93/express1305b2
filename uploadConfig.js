const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

function fileFilter(req, file, cb) {
    const arr = ['image/png', 'image/jpeg'];
    if (arr.indexOf(file.mimetype) === -1) return cb(new Error('Loi dinh dang'));
    cb(null, true);
}

const upload = multer({ storage, fileFilter });

module.exports = upload;