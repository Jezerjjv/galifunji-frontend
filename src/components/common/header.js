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
              <Link to="/" className="nav-link active">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Tipos de Setas
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><Link to="/tipos-setas/comestibles" className="dropdown-item">Setas Comestibles</Link></li>
                <li><Link to="/tipos-setas/venenosas" className="dropdown-item">Setas Venenosas</Link></li>
                <li><Link to="/tipos-setas/medicinales" className="dropdown-item">Setas Medicinales</Link></li>
                <li><Link to="/tipos-setas/silvestres" className="dropdown-item">Setas Silvestres</Link></li>
                <li><Link to="/tipos-setas/cultivadas" className="dropdown-item">Setas Cultivadas</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/recetas" className="nav-link">Recetas</Link>
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