import { Router } from 'express';
import { TokenController } from './token.controller';

const router = Router();

// GET
router.get('/', TokenController.getAll);
router.get('/:id', TokenController.get);

// POST
router.post('/', TokenController.create);
router.post('/sign-in', TokenController.signIn);

// DELETE
router.delete('/expired', TokenController.removeExpiredTokens);
router.delete('/:id', TokenController.remove);

export const TokenRouter = router;
