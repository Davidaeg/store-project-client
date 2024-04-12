import { Panel } from 'primereact/panel';
import FormLogin from './components/formlogin/FormLogin';

export const Login = () => {
  return (
    <Panel header="Iniciar sesión">
      <div className="p-d-flex p-jc-center">
        <FormLogin />
      </div>
    </Panel>
  );
};
