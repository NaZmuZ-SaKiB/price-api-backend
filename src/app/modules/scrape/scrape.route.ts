import { Router } from 'express';
import { ScrapeController } from './scrape.controller';
import token from '../../middlewares/token';

const router = Router();

// POST
router.post('/', token, ScrapeController.scrape);

export const ScrapeRouter = router;
