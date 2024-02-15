import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import './FormSignup.Styles.css';

export default function FormSignup() {
  type Person = {
    name: string;
    firstLastName: string;
    secondLastName: string;
    birthdate: Date | null;
    email: string;
    phone: string;
    address: string;
    password: string;
  };

  const defaultPerson: Person = {
    name: '',
    firstLastName: '',
    secondLastName: '',
    birthdate: null,
    email: '',
    phone: '',
    address: '',
    password: ''
  };

  const [newPerson, setNewPerson] = useState<Person>({ ...defaultPerson });

  const handleInputChange = (field: keyof Person, value: string | Date) => {
    setNewPerson((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  return (
    <Card title="Sign Up" className="form-signup">
      <div className="p-fluid">
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="name"
              value={newPerson.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="firstLastName"
              value={newPerson.firstLastName}
              onChange={(e) =>
                handleInputChange('firstLastName', e.target.value)
              }
            />
            <label htmlFor="firstLastName">First Last Name</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="secondLastName"
              value={newPerson.secondLastName}
              onChange={(e) =>
                handleInputChange('secondLastName', e.target.value)
              }
            />
            <label htmlFor="secondLastName">Second Last Name</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <Calendar
              id="birthdate"
              value={newPerson.birthdate}
              onChange={(e) =>
                handleInputChange(
                  'birthdate',
                  e.value instanceof Date ? e.value : new Date()
                )
              }
              dateFormat="dd/mm/yy"
            />
            <label htmlFor="birthdate">Birthdate</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="email"
              value={newPerson.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="phone"
              value={newPerson.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <label htmlFor="phone">Phone</label>
          </span>
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <InputText
              id="password"
              value={newPerson.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        <div className="card flex justify-content-center">
          <span className="p-float-label">
            <InputTextarea
              id="address"
              value={newPerson.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
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
