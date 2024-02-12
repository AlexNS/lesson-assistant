import {Router} from "express";
import {index, attendanceMark, thanks, notFound} from '../controllers/attendance-controller.js'

const router = Router();

router.get('/attendance/thanks/:key', thanks);
router.get('/attendance/not-found/:key', notFound);
router.get('/attendance/:key', index);
router.post('/attendance/:key', attendanceMark);
  
export default router;
