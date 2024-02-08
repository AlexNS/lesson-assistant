import {Router} from "express";
import {index, register, thanks} from '../controllers/registerController.js'
import upload from "../middlewares/upload.js";

const router = Router();

router.get('/register/thanks', thanks);
router.get('/register/:key', index);
router.post('/register/:key', upload.single('selfie'), register);
  
export default router;
