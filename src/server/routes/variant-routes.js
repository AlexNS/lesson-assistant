import {Router} from "express";
import {index, variant, thanks} from '../controllers/variant-controller.js'

const router = Router();

router.get('/variant/thanks/:variantNumber', thanks);
router.get('/variant', index);
router.post('/variant', variant);
  
export default router;
