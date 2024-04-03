import banner from '/images/banner.webp';
import './banner.styles.css';

export const Banner: React.FC = () => {
  return (
    <div className="banner_image">
      <img
        src={banner}
        alt="Eleva tu estilo con Fashion Loft: confianza y calidad en cada compra."
      />
      <div className="banner_text">
        <h1>¡Bienvenido a Fashion Loft!</h1>
        <p>
          Eleva tu estilo con Fashion Loft: confianza y calidad en cada compra.
        </p>
      </div>
    </div>
  );
};
