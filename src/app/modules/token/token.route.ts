import { Router } from 'express';
import { TokenController } from './token.controller';
import token from '../../middlewares/token';
import access from '../../middlewares/access';

const router = Router();

// GET
router.get('/', token, access('admin'), TokenController.getAll);
router.get('/dashboard', token, TokenController.dashboard);
router.get('/:id', token, access('admin'), TokenController.get);

// POST
router.post('/', token, access('admin'), TokenController.create);
router.post('/sign-in', TokenController.signIn);

// DELETE
router.delete(
  '/expired',
  token,
  access('admin'),
  TokenController.removeExpiredTokens,
);
router.delete('/:id', token, access('admin'), TokenController.remove);

export const TokenRouter = router;
