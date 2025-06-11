import "../styles/Headers.css";
import image from "../assets/image.png";

const Headers = () => {
  return (
    <header className="headers-container">
      <img src={image} alt="FocusMate Logo" className="header-logo" />
      <h1 className="headers-title">FocusMate</h1>
    </header>
  );
};

export default Headers;
