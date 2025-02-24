import { JwtPayload } from 'jsonwebtoken';
import { TToken } from '../modules/token/token.type';

declare global {
  namespace Express {
    interface Request {
      token: TToken;
    }
  }
}
