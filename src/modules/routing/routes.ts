import { Home } from '../home/Home';
import { RouteType } from './routes.types';
import { Signup } from '../signup/Signup';
import { Login } from '../login/Login';
import { TempView } from '../tempViews/TempView';
import EmpSignup from '../empsignup/EmpSignup';
import { ShoppingCart } from '../../shopping/Components/shoppingcart/ShoppingCart';
import { Order } from '../order/Order';
import { Products } from '../products/Products';
import { ProductsManagement } from '../products/productManagement/ProductsManagement';
import { Payment } from '../payment/Payment';

export const appRoutes: RouteType[] = [
  {
    path: '/home',
    name: 'Inicio',
    icon: 'pi pi-home',
    component: Home,
    layout: '/store'
  },
  {
    path: '/products',
    name: 'Productos',
    icon: 'pi pi-shopping-bag',
    component: Products,
    layout: '/store'
  },
  {
    path: '/signup',
    name: 'Registrarse',
    icon: 'pi pi-user',
    component: Signup,
    layout: '/store'
  },
  {
    path: '/login',
    name: 'Iniciar sesion',
    icon: 'pi pi-user',
    component: Login,
    layout: '/store'
  },
  {
    path: '/shopping',
    name: 'Carrito',
    icon: 'pi pi-cart-plus',
    component: ShoppingCart,
    layout: '/store'
  },
  {
    path: '/payment',
    name: 'Pago',
    icon: 'pi pi-cart-plus',
    component: Payment,
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
    name: 'Registrarse',
    icon: 'pi pi-user',
    component: EmpSignup,
    layout: '/admin'
  },
  {
    path: '/form',
    name: 'Productos',
    icon: 'pi pi-pencil',
    component: ProductsManagement,
    layout: '/admin'
  },
  {
    path: '/order',
    name: 'Pedidos',
    icon: 'pi pi-folder-open',
    component: Order,
    layout: '/admin'
  }
];
