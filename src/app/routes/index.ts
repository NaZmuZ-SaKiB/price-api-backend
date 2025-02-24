import { Router } from "express";

const MainRouter = Router();

type TRoute = {
  path: string;
  router: Router;
};

const routes: TRoute[] = []

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;