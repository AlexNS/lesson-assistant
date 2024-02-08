import {Router} from "express";

const router = Router();

router.get('/admin*', function (req, res) {
        res.render('admin');
    });
  
export default router;