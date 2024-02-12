import { Home } from '../home/Home';
import { Products } from '../Products/Products';
import { RouteType } from './routes.types';

export const appRoutes: RouteType[] = [
  {
    path: '/home',
    name: 'Home',
    icon: 'pi pi-home',
    component: Home,
    layout: 'store'
  },
  {
    path: '/products',
    name: 'Products',
    icon: 'pi pi-shopping-cart',
    component: Products,
    layout: 'store'
  }
];
