import { Home } from '../home/Home';
import { Products } from '../Products/Products';
import { RouteType } from './routes.types';
import { Signup } from '../signup/Signup';
import { Login } from '../login/Login';
import { TempView } from '../tempViews/TempView';
import { Form } from '../ProductForm/ProductForm';
import EmpSignup from '../empsignup/EmpSignup';
import { ShoppingCart } from '../../shopping/Components/shoppingcart/ShoppingCart';

export const appRoutes: RouteType[] = [
  {
    path: '/home',
    name: 'Home',
    icon: 'pi pi-home',
    component: Home,
    layout: '/store'
  },
  {
    path: '/products',
    name: 'Products',
    icon: 'pi pi-shopping-cart',
    component: Products,
    layout: '/store'
  },
  {
    path: '/signup',
    name: 'Signup',
    icon: 'pi pi-user',
    component: Signup,
    layout: '/store'
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'pi pi-user',
    component: Login,
    layout: '/store'
  },
  {
    path: '/shopping',
    name: 'shoppingCart',
    icon: 'pi pi-cart-plus',
    component: ShoppingCart,
    layout: '/store'
  },
  {
    path: '/sale',
    name: 'Venta',
    icon: 'pi pi-check-square',
    component: TempView,
    layout: '/admin'
  },
  {
    path: '/empsignup',
    name: 'Signup',
    icon: 'pi pi-user',
    component: EmpSignup,
    layout: '/admin'
  },
  {
    path: '/form',
    name: 'Products Form',
    icon: 'pi pi-pencil',
    component: Form,
    layout: '/admin'
  }
];
