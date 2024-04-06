import { Panel } from 'primereact/panel';
import ErrorPage from './errorpage/ErrorPage';

export const PageNotFound = () => {
  return (
    <Panel header="Error">
      <div className="p-d-flex p-jc-center">
        <ErrorPage/>
      </div>
    </Panel>
  );
};
