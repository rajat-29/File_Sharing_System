var multer=require('multer');

function sanitizeFile(file, cb) {
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    let isAllowedMimeType = file.mimetype.startsWith("image/")
    if(isAllowedExt && isAllowedMimeType){
        return cb(null ,true) // no errors
    }
    else{
        cb('Error: File type not allowed!')
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      var photoname = Date.now()+ file.fieldname+'.'+file.originalname.split('.')[1].toLowerCase()
      req.session.data.photoname = '../' + photoname
      cb(null, photoname)
    }
})

exports.upload = multer({ storage: storage ,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('myFile');