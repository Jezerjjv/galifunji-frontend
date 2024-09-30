import React from 'react';
import { Link } from 'react-router-dom';
import Mushrooms from '../../assets/mushrooms.svg';

function Header() {
  return (
    <nav className=" header navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={Mushrooms} alt="seta" className="seta me-2" />
          GaliFunji
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/start" className="nav-link active">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Tipos de Setas
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><Link to="/magic-mushrooms" className="dropdown-item">Magicas</Link></li>
                <li><Link to="/medicinal-mushrooms" className="dropdown-item">Medicinales</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/recipes" className="nav-link">Recetas</Link>
            </li>
            <li className="nav-item">
              <Link to="/guia-recoleccion" className="nav-link">Guía de Recolección</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;