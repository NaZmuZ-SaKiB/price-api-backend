import { Router } from 'express';
import { HistoryController } from './history.controller';

const router = Router();

// GET
router.get('/', HistoryController.getAll);

// DELETE
router.delete('/clear', HistoryController.clear);

export const HistoryRouter = router;
