import { Panel } from 'primereact/panel';

export const TempView = () => {
  return (
    <Panel header="Temp View" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="p-d-flex p-jc-center">
        <h1>Temp View</h1>
      </div>
    </Panel>
  );
};
