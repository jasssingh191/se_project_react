import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        © {currentYear} Developed by Jaspreet Singh.
      </p>
    </footer>
  );
}

export default Footer;
