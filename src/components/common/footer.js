import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className=" footer bg-success text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">GaliFunji</h5>
            <p className="mb-0">Explora el fascinante mundo de las setas con nosotros.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">Síguenos</h5>
            <div className="d-flex">
              <a href="https://facebook.com" className="text-white me-3" aria-label="Facebook">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3" aria-label="Twitter">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="https://instagram.com" className="text-white me-3" aria-label="Instagram">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://linkedin.com" className="text-white" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Información Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/legal-advice" className="text-white">Aviso Legal</Link></li>
              <li><Link to="/security-policy" className="text-white">Política de Seguridad</Link></li>
              <li><Link to="/privacy-policy" className="text-white">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <hr className="my-4 bg-white" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 fw-bold">&copy; {new Date().getFullYear()} GaliFunji. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;