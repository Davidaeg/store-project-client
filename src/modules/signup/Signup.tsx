import { Panel } from 'primereact/panel';
import FormSignup from './components/formsignup/FormSignup';
export const Signup = () => {
  return (
    <Panel header=" Registrarse">
      <div className="p-d-flex p-jc-center">
        <FormSignup />
      </div>
    </Panel>
  );
};
