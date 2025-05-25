import multer from "multer";
const storage = multer.diskStorage({
    // here I determine where my images should be save
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    // and here determine the name of my images
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("image");
   

  export default upload;