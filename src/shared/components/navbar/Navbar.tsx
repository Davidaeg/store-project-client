import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../modules/routing/routes';

import './Navbar.styles.css';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../../../modules/auth/Authentication.context';
import { UserType } from '../../datasources/user/user.types';

export const Navbar = () => {
  const { user, logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);

  const activeRoute = (routeName: string) => {
    return window.location.href.includes(routeName) ? 'active' : '';
  };

  const setAvailableRoutes = () => {
    const items = appRoutes
      .filter((route) => user?.routes.includes(route.path))
      .map((route) => {
        return {
          label: route.name,
          icon: route.icon,
          command: () => {
            navigate(`${route.layout}${route.path}`);
          },
          className: activeRoute(`${route.layout}${route.path}`)
        };
      });
    setItems(items);
  };

  useEffect(() => {
    setAvailableRoutes();
  }, [user]);

  const start = (
    <img alt="logo" src="/images/logo.ico" height="50" className="mr-2"></img>
  );
  const SessionButtonActionHandler = () => {
    if (user?.userType === UserType.GUEST) {
      navigate('/store/login');
    } else {
      logout();
    }
  };

  const end = (
    <div className="flex align-items-center gap-2">
      <button
        className="logButton p-button p-button-text p-button-rounded "
        onClick={SessionButtonActionHandler}
      >
        {user?.userType === UserType.GUEST ? 'Login' : 'Logout'}{' '}
      </button>

      <p>{user ? user.username.split('@')[0] : 'Guest'}</p>
      <Avatar image="/images/user.png" shape="circle" />
    </div>
  );

  return (
    <div className="card" style={{ width: '100vw', maxWidth: '100%' }}>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};
