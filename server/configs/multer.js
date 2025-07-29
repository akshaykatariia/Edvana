import multer from "multer";

const storage = multer.diskStorage({}) // temporarily store in disk file

const upload = multer({storage})

export default upload 

