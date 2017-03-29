// app
import { HomeRoutes } from './home/home.routes';
import { AboutRoutes } from './about/about.routes';

export const routes: Array<any> = [
  ...HomeRoutes,
  ...AboutRoutes
];
