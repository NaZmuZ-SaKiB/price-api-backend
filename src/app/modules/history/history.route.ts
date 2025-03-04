import { Router } from 'express';
import { HistoryController } from './history.controller';
import token from '../../middlewares/token';

const router = Router();

// GET
router.get('/', token, HistoryController.getAll);

// DELETE
router.delete('/clear', token, HistoryController.clear);

export const HistoryRouter = router;
