import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import './FormSignup.Styles.css';

export default function FormSignup() {
  const [name, setName] = useState('');
  const [firstLastName, setFirstLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card title="Sign Up" className="FormSignup">
      <div className="p-fluid">
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="firstLastName"
              value={firstLastName}
              onChange={(e) => setFirstLastName(e.target.value)}
            />
            <label htmlFor="firstLastName">First Last Name</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="secondLastName"
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
            />
            <label htmlFor="secondLastName">Second Last Name</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <Calendar
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.value ? new Date(e.value) : null)}
              dateFormat="dd/mm/yy"
            />
            <label htmlFor="birthdate">Birthdate</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        <div className="card flex justify-content-center">
          <span className="p-float-label">
            <InputTextarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address">Address</label>
          </span>
        </div>

        <div className="flex justify-content-center p-button-signup">
          <Button
            label="Sign Up"
            icon="pi pi-user-plus"
            className="w-10rem"
          ></Button>
        </div>
        <div className="flex justify-content-center ">
          <p>
            Already have an account? <a href="Login">Login</a>
          </p>
        </div>
      </div>
    </Card>
  );
}
