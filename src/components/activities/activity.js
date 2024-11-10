import React from 'react';


export default function Activity({ activity }) {

    function formatearFecha(fecha) {
        const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);
        return fechaFormateada.replace(/^(\d+) de (\w+) de (\d+)$/, '$1 de $2 del $3');
    }

    return (
        <div className="card h-100 position-relative overflow-hidden">
            <div className="row g-0 h-100">
                <div className="col-md-4">
                    <img
                        src="https://images.unsplash.com/photo-1597585588073-091447702d37?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="img-fluid h-100 w-100"
                        alt={activity.nombre}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body d-flex flex-column h-100">
                        <h5 className="card-title text-success">{activity.nombre}</h5>
                        <p className="card-text text-primary fw-bold">{activity.precio ==="0.00"?"Gratis":`${activity.precio}€`}</p>
                        <div className="mt-auto">
                            <p className="card-text mb-1"><small className="text-muted">🗓️ {`${formatearFecha(activity.fecha_inicio)} al ${formatearFecha(activity.fecha_fin)}`}</small></p>
                            <p className="card-text mb-1"><small className="text-muted">🏞️ {activity.ubicacion}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center opacity-0 hover-overlay transition-opacity">
                <p className="text-white p-3 m-0">{activity.descripcion}</p>
            </div>
        </div>
    );
}