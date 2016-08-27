import { Route } from '@angular/router';

export const AboutRoutes: Route[] = [
  {
    path: 'about',
    loadChildren: 'app/components/+about/about.module#AboutModule'
  }
];
