import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} FocusMate. All rights reserved.
    </footer>
  );
};

export default Footer;
