import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>FDIC Insured up to $250,000</p>
      <div className="footer-links">
        <a href="/privacy"><i className="fas fa-lock"></i> Privacy Policy</a>
        <a href="/terms"><i className="fas fa-file-alt"></i> Terms</a>
        <a href="/contact"><i className="fas fa-envelope"></i> Contact</a>
      </div>
    </footer>
  );
}

export default Footer;