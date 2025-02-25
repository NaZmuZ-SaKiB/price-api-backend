import { Router } from 'express';
import { ScrapeController } from './scrape.controller';

const router = Router();

// POST
router.post('/', ScrapeController.scrape);

export const ScrapeRouter = router;
