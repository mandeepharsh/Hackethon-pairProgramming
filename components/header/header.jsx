import "../header/header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header">
        <Link className="header__link" to="/">
          <p className="header__logo">HA.TH</p>
        </Link>
      </div>
    </>
  );
}

export default Header;
