import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

// GET
router.get('/', ProductController.getAll);

// PATCH
router.patch('/:id', ProductController.update);

export const ProductRouter = router;
