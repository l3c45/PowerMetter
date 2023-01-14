import { useState } from "react";
import { TbPlugConnected, TbPlugConnectedX } from "react-icons/tb";

const Logo = require("../assets/logo.png");

const Header = ({ active }: { active: boolean }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false)

  const handleCollapse = () => setIsCollapsed(!isCollapsed);
  

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
            aria-expanded={!isCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${
              isCollapsed ? "collapse" : ""
            } navbar-collapse d-flex-md justify-content-end`}
            id="navbarColor01"
          >
            <ul className="navbar-nav align-items-center ">
              <li className="nav-item d-flex align-items-center">
              {hover?<span className="text-light">{active?"Conectado":"Desconectado"}</span>:null}
                <span className="nav-link " onMouseEnter={()=>setHover(prev=>!prev) } onMouseLeave={()=>setHover(prev=>!prev)} >
                 {active ? <TbPlugConnected  size={30} color="white"/> : <TbPlugConnectedX size={30} color="red"/>}
                </span>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#chart">
                  Registro de datos
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Acerca
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
