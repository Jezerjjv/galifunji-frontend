import React from 'react';

function LandingP2() {
    return (
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
    );
}

export default LandingP2;