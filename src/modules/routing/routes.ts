import { Home } from '../home/Home';
import { TempView } from '../tempViews/TempView';
import { RouteType } from './routes.types';
import { Signup } from '../signup/Signup';
import { Login } from '../login/Login';

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
    component: TempView,
    layout: 'store'
  },
  {
    path: '/signup',
    name: 'Signup',
    icon: 'pi pi-user',
    component: Signup,
    layout: 'store'
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'pi pi-user',
    component: Login,
    layout: 'store'
  }
];
