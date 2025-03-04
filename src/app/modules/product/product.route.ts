import { Router } from 'express';
import { ProductController } from './product.controller';
import token from '../../middlewares/token';

const router = Router();

// GET
router.get('/', token, ProductController.getAll);
router.get('/update-count', token, ProductController.updateCount);

// PATCH
router.patch('/:id', token, ProductController.update);

export const ProductRouter = router;
