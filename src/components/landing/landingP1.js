import React from 'react';
import videoSrc from '../../assets/video.mp4';

function LandingP1() {
    return (
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
    );
}

export default LandingP1;



