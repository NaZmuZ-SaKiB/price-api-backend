import { Router } from 'express';
import { UrlController } from './url.controller';

const router = Router();

// GET
router.get('/', UrlController.getAll);
router.get('/:id', UrlController.get);

// POST
router.post('/', UrlController.create);

// PATCH
router.patch('/:id', UrlController.update);

// DELETE
router.delete('/:id', UrlController.remove);

export const UrlRouter = router;
