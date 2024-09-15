import React from 'react'
import Mushrooms from '../../assets/mushrooms.svg';
const navbarLanding = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100" style={{ zIndex: 1000 }}>
            <div className="container">
                <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
                    <img src={Mushrooms} alt="Seta" className="seta me-2" />
                    Galifunji
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#tipos">Tipos</a></li>
                        <li className="nav-item"><a className="nav-link" href="#beneficios">Beneficios</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default navbarLanding