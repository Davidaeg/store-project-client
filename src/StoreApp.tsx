import 'primereact/resources/themes/tailwind-light/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import { PrimeReactProvider } from 'primereact/api';
import { Layout } from './shared/components/layout/Layout';

function StoreApp() {
  return (
    <PrimeReactProvider>
      <Layout />
    </PrimeReactProvider>
  );
}

export default StoreApp;
