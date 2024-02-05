import './Footer.styles.css';

import { Divider } from 'primereact/divider';

export const Footer = () => {
  return (
    <footer className="flex-container">
      <div className="flex-item image-container">
        <img className="imgPatitos" src="/images/tres_patitos.png" alt="" />
      </div>
      <Divider layout="vertical" />
      <div className="flex-item">
        <p className="columntitle">Misión</p>
        <p>
          “Ser un proveedor de confianza para los clientes, brindando productos
          de calidad”
        </p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-item ">
        <p className="columntitle">Visión</p>
        <p>“Ser la empresa distribuidora de productos N°1 en Heredia”</p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-item ">
        <p className="columntitle"> Nosotros</p>
        <ul>
          <li className="liInfomracion">Correo: trespatitos@patitos.com</li>
          <li className="liInfomracion">Numero: +506 2233 4455</li>
          <li className="liInfomracion">
            Ubicacion: 123 Calle Ficticia, Barrio Imaginario, Heredia, Costa
            Rica
          </li>
        </ul>
      </div>
    </footer>
  );
};
