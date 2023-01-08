const Logo = require('../assets/logo.png');



const Header=()=> {
  return (
    <header>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary nav">
  <div className="container-fluid">
    <img className="logo" src={Logo} alt="Logo website" />
    <h2  >PowerMetter</h2>
    
    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarColor01">
      <ul className="navbar-nav  ">
        <li className="nav-item">
          <a className="nav-link active" href="#chart">Home
            <span className="visually-hidden">(current)</span>
          </a>
        </li>
       
        <li className="nav-item">
          <a className="nav-link" href="#about">About</a>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

    </header>
  );
}

export default Header;
