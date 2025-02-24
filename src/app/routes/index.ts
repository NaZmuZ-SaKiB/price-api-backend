import { Router } from 'express';
import { TokenRouter } from '../modules/token/token.route';

const MainRouter = Router();

type TRoute = {
  path: string;
  router: Router;
};

const routes: TRoute[] = [
  {
    path: '/token',
    router: TokenRouter,
  },
];

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;
