import './Footer.styles.css';

const footerStyle = {
  backgroundColor: '#f4f4f4',
  padding: '20px',
  color: '#333'
};

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="footer-content">
        <div className="contact-info">
          <h5>Contact Us</h5>
          <p>Email: info@example.com</p>
          <p>Phone: +1 123 456 7890</p>
        </div>
        <div className="subscribe-button">
          <button className="rounded-button">Subscribe</button>
        </div>
      </div>

      <div className="footer-content">
        <div className="copyright-info">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
        <div className="social-icons">
          <button className="icon-button">
            <i className="pi pi-facebook"></i>
          </button>
          <button className="icon-button">
            <i className="pi pi-twitter"></i>
          </button>
          <button className="icon-button">
            <i className="pi pi-linkedin"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};
