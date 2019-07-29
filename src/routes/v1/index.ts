import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { Influencer } from '../../controllers/v1';
import { getInfluencerSchema, createInfluencerSchema } from '../../schemas';
import { validationErrorsMiddleware } from "../../middlewares";

const router = Router();

router.get('/', function(req: Request, res: Response) {
  return res.json('Welcome to Influencers Version 1 API');
});

router.get('/influencer/:id', checkSchema(getInfluencerSchema), validationErrorsMiddleware,  Influencer.get);
router.post('/influencer', checkSchema(createInfluencerSchema), validationErrorsMiddleware, Influencer.post);


export default router;
