import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

// GET
router.get('/', ProductController.getAll);
router.get('/update-count', ProductController.updateCount);

// PATCH
router.patch('/:id', ProductController.update);

export const ProductRouter = router;
