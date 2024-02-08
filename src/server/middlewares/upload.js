import multer from 'multer';
import { UploadPath } from '../config/config.js';
import { v4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UploadPath);
  },
  filename: (req, file, cb) => {
    const parsedPath = path.parse(file.originalname);
    cb(null, v4() + parsedPath.ext);
  }
});

const upload = multer({ storage: storage });

export default  upload;
