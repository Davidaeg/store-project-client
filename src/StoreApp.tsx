import 'primereact/resources/themes/tailwind-light/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import { PrimeReactProvider } from 'primereact/api';
import { Layout } from './shared/components/layout/Layout';
import { AppRouter } from './modules/routing/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './modules/auth/Authentication.context';
import { ShoppingCartProvider } from './context/shoppingCartContext';

function StoreApp() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthenticationProvider>
          <ShoppingCartProvider>
            <Layout>
              <AppRouter />
            </Layout>
          </ShoppingCartProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default StoreApp;
