import { Panel } from 'primereact/panel';
import { Carrousel } from './components/carrousel/Carrousel';
import { Banner } from './components/banner/banner';

export const Home = () => {
  return (
    <Panel header=" Home">
      <div className="p-d-flex p-jc-center">
        <Banner />
        <Carrousel />
      </div>
    </Panel>
  );
};
