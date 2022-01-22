//import multer from "multer";
const multer = require('multer');
const Reciept = require('./Receipt');

module.exports  =(multer({

    /*   storage: multer({
       const :newImage = new Reciept({
            name: 
        })

        
      }),*/
    storage: multer.diskStorage({

        destination: (req, file, cb) =>{ 
          cb(null,'./tmp')
        },

        filename: (req, file, cb) => {
          cb(null, Date.now().toString + "--" + file.originalname)
        }

    }),

    fileFilter: (req, file, cb) =>{

        const extensaoImg = ['image/png', 'image/jpg', 'image/gif'].find(formatoAceito => formatoAceito == file.mimetype);
        if(extensaoImg){
          return cb(null, true);
        }
  
        return cb(null, false)

    }
  }));