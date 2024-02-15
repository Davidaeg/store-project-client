import { Panel } from 'primereact/panel';
import { Carrousel } from './components/carrousel/Carrousel';

export const Home = () => {
  return (
    <Panel header=" Home" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="p-d-flex p-jc-center">
        <h1>Home</h1>
        <Carrousel />
      </div>
    </Panel>
  );
};
