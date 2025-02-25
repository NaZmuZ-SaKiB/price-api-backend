import { Router } from 'express';
import { TokenRouter } from '../modules/token/token.route';
import { ScrapeRouter } from '../modules/scrape/scrape.route';

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
  {
    path: '/scrape',
    router: ScrapeRouter,
  },
];

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;
