import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import './FormLogin.Styles.css';
import { AuthenticationContext } from '../../../auth/Authentication.context';

export default function FormLogin() {
  const { login } = useContext(AuthenticationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className="principal-card">
      <div className="p-fluid">
        <Card title="Login" className="form-login">
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
                  Email
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
                  Password
                </label>
              </span>
            </div>
            <div className="flex justify-content-center p-button-Login">
              <Button
                label="Login"
                icon="pi pi-user"
                className="w-10rem"
                onClick={() => login({ username: email, password })}
              ></Button>
            </div>
            <div className="flex justify-content-center ">
              <p>
                Don't you have an account yet ? <a href="Signup">Signup</a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
