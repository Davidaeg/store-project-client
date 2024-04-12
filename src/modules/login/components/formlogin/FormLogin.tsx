import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import './FormLogin.Styles.css';
import { AuthenticationContext } from '../../../auth/Authentication.context';
import { useModals } from '../../../../shared/hooks/modals/useModals.hook';

export default function FormLogin() {
  const { login } = useContext(AuthenticationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showErrorModal } = useModals();

  const handleLogin = () => {
    if (!email || !password) {
      showErrorModal('Error!', 'Por favor, ingresa un email y una contraseña.');
      return;
    }
    login({ username: email, password });
  };
  return (
    <Card className="principal-card">
      <div className="p-fluid">
        <Card title="Inicio de sesión" className="form-login">
          <div className="p-fluid">
            <div className="p-field">
              <span className="p-float-label">
                <i className="pi pi-envelope"></i>
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className="p-float-label-text">
                Correo electrónico
                </label>
              </span>
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <i className="pi pi-lock "></i>
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  feedback={false}
                  toggleMask
                />
                <label htmlFor="password" className="p-float-label-text">
                 Contraseña
                </label>
              </span>
            </div>
            <div className="flex justify-content-center p-button-Login">
              <Button
                label="Iniciar sesión"
                icon="pi pi-user"
                className="w-10rem"
                onClick={handleLogin}
              ></Button>
            </div>
            <div className="flex justify-content-center ">
              <p>
                No tienes una cuenta aún? ve a registrarse
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
