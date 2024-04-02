import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useCreatePerson } from '../../shared/datasources/person/person-api/UseCreatePerson.hook';
import { useModals } from '../../shared/hooks/modals/useModals.hook';
import { CreatePersonDto } from '../../shared/datasources/person/person.types';
import '../empsignup/EmpSignup.Styles.css';
import { UserType } from '../../shared/datasources/user/user.types';

const defaultPerson = {
  name: '',
  firstLastName: '',
  secondLastName: '',
  birthday: new Date(),
  email: '',
  phoneNumber: '',
  address: '',
  password: '',
  userType: UserType.EMPLOYEE
};
export default function EmpSignup() {
  const { createPerson } = useCreatePerson();
  const { showErrorModal, showSuccessModal } = useModals();
  const [newPerson, setNewPerson] = useState<CreatePersonDto>(defaultPerson);

  const handleInputChange = (
    field: keyof CreatePersonDto,
    value: string | Date
  ) => {
    setNewPerson((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPerson(newPerson)
      .then(() => {
        console.log('Creating a person');
        setNewPerson(defaultPerson);
        showSuccessModal();
      })
      .catch(({ error }) => {
        console.error('Error creating person:', error);
        setNewPerson(defaultPerson);
        showErrorModal();
      });
  };
  return (
    <Card title="Sign Up" className="form-empSignup">
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
              value={newPerson.birthday}
              onChange={(e) =>
                handleInputChange(
                  'birthday',
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
              value={newPerson.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
            onClick={handleSubmit}
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
