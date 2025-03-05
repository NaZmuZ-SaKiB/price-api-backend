import { Router } from 'express';
import { ProductController } from './product.controller';
import token from '../../middlewares/token';
import access from '../../middlewares/access';

const router = Router();

// GET
router.get('/', token, ProductController.getAll);
router.get('/update-count', token, ProductController.updateCount);

// PATCH
router.patch('/:id', token, ProductController.update);

// DELETE
router.delete(
  '/remove-not-in-stock',
  token,
  access('admin'),
  ProductController.removeNotInStock,
);

export const ProductRouter = router;
