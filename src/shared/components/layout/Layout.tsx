import { PropsWithChildren } from 'react';
import { Navbar } from '../navbar/Navbar';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">{children}</div>
    </>
  );
};
