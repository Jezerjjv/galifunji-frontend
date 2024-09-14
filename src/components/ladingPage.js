import React, { useEffect } from 'react';
import videoSrc from '../assets/video.mp4';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const Divider = ({ light }) => (
        <div className={`divider my-5 ${light ? 'bg-light' : 'bg-dark'}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 col-md-6 col-lg-4">
                        <hr className={`border-2 opacity-25 ${light ? 'border-dark' : 'border-light'}`} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-dark text-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100" style={{ zIndex: 1000 }}>
                <div className="container">
                    <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mushroom me-2" viewBox="0 0 16 16">
                            <path d="M8 0a7 7 0 0 1 7 7 .5.5 0 0 1-.5.5H1.5A.5.5 0 0 1 1 7a7 7 0 0 1 7-7zM1.5 8h13a.5.5 0 0 1 .5.5v.5a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M6 9v3h4V9H6zm2 4v1h2v-1H8z" />
                        </svg>
                        Galufunji
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

            <header id="inicio" className="vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden">
                <video autoPlay loop muted playsInline className="position-absolute w-100 h-100 object-fit-cover" >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="text-center" style={{ zIndex: 2 }}>
                    <h1 className="display-1 fw-bold mb-4" data-aos="fade-up">Descubre el Mundo de Galufunji</h1>
                    <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">Explora la diversidad, los beneficios y la belleza de los hongos</p>
                    <a href="#tipos" className="btn btn-outline-light btn-lg" data-aos="fade-up" data-aos-delay="400">Descubre Más</a>
                </div>
            </header>

            <Divider light={false} />

            <section id="tipos" className="py-5 bg-light text-dark">
                <div className="container">
                    <h2 className="text-center mb-5 display-4 fw-bold" data-aos="fade-up">Tipos de Setas</h2>
                    <div className="row g-4">
                        {[
                            { name: 'Comestibles', img: 'https://plus.unsplash.com/premium_photo-1663127475022-fb71dcb1326a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Deliciosas y nutritivas, perfectas para la cocina.' },
                            { name: 'Medicinales', img: 'https://images.unsplash.com/photo-1623227866882-c005c26dfe41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', desc: 'Con propiedades curativas y beneficios para la salud.' },
                            { name: 'Silvestres', img: 'https://plus.unsplash.com/premium_photo-1674575415644-3dcf6b288855?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Fascinantes especies que crecen en la naturaleza.' }
                        ].map((seta, index) => (
                            <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay={index * 200}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <img src={seta.img} className="card-img-top" alt={`Setas ${seta.name}`} style={{ height: '250px', objectFit: 'cover' }} />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{seta.name}</h5>
                                        <p className="card-text">{seta.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Divider light={true} />

            <section id="beneficios" className="py-5 bg-dark text-light">
                <div className="container">
                    <h2 className="text-center mb-5 display-4 fw-bold" data-aos="fade-up">Beneficios de las Setas</h2>
                    <div className="row g-4">
                        <div className="col-md-6" data-aos="fade-right">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-dark text-light border-light">Ricas en proteínas y fibra</li>
                                <li className="list-group-item bg-dark text-light border-light">Bajas en calorías</li>
                                <li className="list-group-item bg-dark text-light border-light">Contienen antioxidantes</li>
                                <li className="list-group-item bg-dark text-light border-light">Apoyan al sistema inmunológico</li>
                            </ul>
                        </div>
                        <div className="col-md-6" data-aos="fade-left">
                            <p className="lead">Las setas son una fuente increíble de nutrientes y compuestos beneficiosos para la salud. Desde mejorar la digestión hasta fortalecer el sistema inmunológico, las setas ofrecen una amplia gama de beneficios para quienes las incorporan en su dieta.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Divider light={false} />

            <section className="py-5 bg-light text-dark">
                <div className="container text-center">
                    <h2 className="mb-4 display-4 fw-bold" data-aos="fade-up">¿Quieres saber más?</h2>
                    <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">Descubre todo sobre el fascinante mundo de las setas en nuestra página web completa.</p>
                    <a href="https://www.galufunji.com" className="btn btn-dark btn-lg" data-aos="fade-up" data-aos-delay="400">Visita Nuestra Página</a>
                </div>
            </section>

            <footer className="bg-dark text-light text-center py-4 mt-5">
                <div className="container">
                    <p className="mb-0">&copy; 2023 Galifunji. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;