import './Footer.styles.css';

import { Divider } from 'primereact/divider';

export const Footer = () => {
  return (
    <footer className="flex-container">
      <div className="flex-item image-container">
        <img
          className="img-logo"
          src="/images/logo.webp"
          alt="fashion Loft logo"
        />
      </div>
      <Divider layout="vertical" />
      <div className="flex-item">
        <p className="column-title">Misión</p>
        <p>
          “Ser un proveedor de confianza para los clientes, brindando productos
          de calidad”
        </p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-item ">
        <p className="column-title">Visión</p>
        <p>“Ser la empresa distribuidora de productos N°1 en Heredia”</p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-item ">
        <p className="column-title"> Nosotros</p>
        <ul>
          <li className="li-information ">Correo: contact@fashionLoft.com</li>
          <li className="li-information ">Numero: +506 2233 4455</li>
          <li className="li-information ">
            Ubicacion: 123 Calle Ficticia, Barrio Imaginario, Heredia, Costa
            Rica
          </li>
        </ul>
      </div>
    </footer>
  );
};
