import { TempHome } from '../tempViews/TempHome';
import { TempView } from '../tempViews/TempView';
import { RouteType } from './routes.types';

export const appRoutes: RouteType[] = [
  {
    path: '/home',
    name: 'Home',
    icon: 'pi pi-home',
    component: TempHome,
    layout: 'store'
  },
  {
    path: '/products',
    name: 'Products',
    icon: 'pi pi-shopping-cart',
    component: TempView,
    layout: 'store'
  }
];
