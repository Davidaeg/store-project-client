
import { Card } from 'primereact/card';
import './ErrorPage.Styles.css';

const ErrorPage = () => {
    return (
        <div className="error-page text-center">
          <Card className="error-card">
            <div className="image-container" >
              <img
                src="/images/error.png"
                alt="Error"
                className="error-image p-fluid"
              />
            </div>
            <h1 className="error-text">Oops! No pudimos encontrar la página que buscas</h1>
          </Card>
        </div>
      );
};

export default ErrorPage;