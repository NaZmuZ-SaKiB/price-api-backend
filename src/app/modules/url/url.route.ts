import { Router } from 'express';
import { UrlController } from './url.controller';
import token from '../../middlewares/token';

const router = Router();

// GET
router.get('/', UrlController.getAll);
router.get('/:id', UrlController.get);

// POST
router.post('/', token, UrlController.create);

// PATCH
router.patch('/:id', token, UrlController.update);

// DELETE
router.delete('/:id', token, UrlController.remove);

export const UrlRouter = router;
