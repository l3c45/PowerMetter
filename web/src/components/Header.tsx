const Logo = require("../assets/logo.png");

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary nav p-0">
        <div className="container-fluid">
          <img className="logo" src={Logo} alt="Logo website" />
          <h2>PowerMetter</h2>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex-md justify-content-end "
            id="navbarColor01"
          >
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <a className="nav-link active" href="#chart">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
