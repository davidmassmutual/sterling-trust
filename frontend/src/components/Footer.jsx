import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>FDIC Insured up to $250,000</p>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
}

export default Footer;