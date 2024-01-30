import { PropsWithChildren } from 'react';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};
