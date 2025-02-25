import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

// GET
router.get('/', ProductController.getAll);

export const ProductRouter = router;
