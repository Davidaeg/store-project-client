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
          “To be a trusted provider for customers, offering quality products.”
        </p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-item ">
        <p className="column-title">Visión</p>
        <p>“To be the number one product distributor in Heredia.”</p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-item ">
        <p className="column-title"> Us</p>
        <ul>
          <li className="li-information ">Email: contact@fashionLoft.com</li>
          <li className="li-information ">Number: +506 2233 4455</li>
          <li className="li-information ">
            Location: 123 Fictitious Street, Imaginary Neighborhood, Heredia,
            Costa Rica.
          </li>
        </ul>
      </div>
    </footer>
  );
};
