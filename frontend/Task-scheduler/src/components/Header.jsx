import { useNavigate, Link } from "react-router-dom";
import "../styles/Header.css";
import image from "../assets/image.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={image} alt="FocusMate Logo" className="logo" />
        <h1 className="app-name">FocusMate</h1>
      </div>

      <nav className="nav-actions">
        <Link to="/users" className="nav-link">Users</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
