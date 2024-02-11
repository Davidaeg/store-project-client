import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

import './Navbar.styles.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const activeRoute = (routeName: string) => {
    return window.location.href.includes(routeName) ? 'active' : '';
  };

  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        navigate('/store/home');
      },
      className: activeRoute('/store/home')
    },
    {
      label: 'Products',
      icon: 'pi pi-star',
      command: () => {
        navigate('/store/products');
      },
      className: activeRoute('/store/products')
    },
    {
      label: 'Consulta',
      icon: 'pi pi-envelope',
      command: () => {
        navigate('/store/consulta');
      },
      className: activeRoute('/store/consulta')
    },
    {
      label: 'Registrarse',
      icon: 'pi pi-user',
      command: () => {
        navigate('/store/signup');
      },
      className: activeRoute('/store/signup')
    }
  ];

  const start = (
    <img
      alt="logo"
      src="../../../../public/images/logo.ico"
      height="50"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <p>Username</p>
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="card" style={{ width: '100vw', maxWidth: '100%' }}>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};
