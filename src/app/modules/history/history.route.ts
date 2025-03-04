import { Router } from 'express';
import { HistoryController } from './history.controller';
import token from '../../middlewares/token';
import access from '../../middlewares/access';

const router = Router();

// GET
router.get('/', token, HistoryController.getAll);

// DELETE
router.delete('/clear', token, access('admin'), HistoryController.clear);

export const HistoryRouter = router;
