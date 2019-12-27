var multer=require('multer');

function sanitizeFile(file, cb) {
    let fileExts = ['png', 'jpg', 'jpeg', 'gif', 'pdf']
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());

    if(isAllowedExt){
        return cb(null ,true) 
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
      var photoname =file.originalname;
      cb(null, photoname)
    }
})

exports.upload = multer({ storage: storage ,
    fileFilter: function (req, file, cb) {
    sanitizeFile(file, cb);   
    }
}).array('myFiles')

exports.uploadUserImage = multer({ storage: storage ,
    fileFilter: function (req, file, cb) {
    sanitizeFile(file, cb);   
    }
}).single('userFile')