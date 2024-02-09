import {Router} from "express";

const router = Router();

router.get('/', function (req, res) {
        res.sendStatus(404);
    });
  
export default router;
