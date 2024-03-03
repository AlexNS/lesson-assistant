import {Router} from "express";
import {index, attendanceMark, thanks, notFound, infoForm, infoFormPost, infoFormResult } from '../controllers/attendance-controller.js'

const router = Router();

router.get('/attendance/thanks/:key', thanks);
router.get('/attendance/not-found/:key', notFound);
router.get('/attendance/info', infoForm);
router.post('/attendance/info', infoFormPost);
router.get('/attendance/info/:studentId', infoFormResult);
router.get('/attendance/:key', index);
router.post('/attendance/:key', attendanceMark);
  
export default router;
