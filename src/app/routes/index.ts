import { Router } from 'express';
import { TokenRouter } from '../modules/token/token.route';
import { ScrapeRouter } from '../modules/scrape/scrape.route';
import { ProductRouter } from '../modules/product/product.route';
import { UrlRouter } from '../modules/url/url.route';
import { HistoryRouter } from '../modules/history/history.route';

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
  {
    path: '/product',
    router: ProductRouter,
  },
  {
    path: '/url',
    router: UrlRouter,
  },
  {
    path: '/history',
    router: HistoryRouter,
  },
];

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;
