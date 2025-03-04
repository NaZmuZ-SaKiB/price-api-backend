import { Router } from 'express';
import { TokenController } from './token.controller';
import token from '../../middlewares/token';

const router = Router();

// GET
router.get('/', token, TokenController.getAll);
router.get('/dashboard', token, TokenController.dashboard);
router.get('/:id', token, TokenController.get);

// POST
router.post('/', token, TokenController.create);
router.post('/sign-in', TokenController.signIn);

// DELETE
router.delete('/expired', token, TokenController.removeExpiredTokens);
router.delete('/:id', token, TokenController.remove);

export const TokenRouter = router;
