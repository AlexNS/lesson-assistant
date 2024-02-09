import {Router} from "express";
import {index, question, thanks} from '../controllers/question-controller.js'

const router = Router();

router.get('/question/thanks/:key', thanks);
router.get('/question/:key', index);
router.post('/question/:key', question);
  
export default router;
