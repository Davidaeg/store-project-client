import { PropsWithChildren } from 'react';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
