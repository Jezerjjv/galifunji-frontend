import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMushroomById } from "../../services/mushrooms";

const DetailMushrooms = () => {
    const { id } = useParams();
    const [seta, setSeta] = useState(null);
    const [imagenPrincipal, setImagenPrincipal] = useState(null);

    useEffect(() => {
        getMushroomById(id).then(data => {
            setSeta(data[0]);
            setImagenPrincipal(data[0].imagenes[0]);
        });
    }, [id]);

    const renderContent = () => {
        return (
            <div className="container mt-5 mb-5">
                <h1 className="mb-4">{seta.nombre}</h1>

                <div className="row mb-4">
                    <div className="col-md-8">
                        <img src={imagenPrincipal} alt={seta.nombre} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            {seta.imagenes.map((img, index) => (
                                <div key={index} className="col-6 mb-2">
                                    <img
                                        src={img}
                                        alt={`${seta.nombre} ${index + 1}`}
                                        className="img-fluid rounded cursor-pointer"
                                        onClick={() => setImagenPrincipal(img)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="accordion" id="acordeonSeta">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDescripcion">
                                Descripción
                            </button>
                        </h2>
                        <div id="collapseDescripcion" className="accordion-collapse collapse show" data-bs-parent="#acordeonSeta">
                            <div className="accordion-body">
                                {seta.descripcion}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHabitat">
                                Hábitat
                            </button>
                        </h2>
                        <div id="collapseHabitat" className="accordion-collapse collapse" data-bs-parent="#acordeonSeta">
                            <div className="accordion-body">
                                {seta.habitat}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTemporada">
                                Temporada
                            </button>
                        </h2>
                        <div id="collapseTemporada" className="accordion-collapse collapse" data-bs-parent="#acordeonSeta">
                            <div className="accordion-body">
                                {seta.temporada}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseComestibilidad">
                                Comestibilidad
                            </button>
                        </h2>
                        <div id="collapseComestibilidad" className="accordion-collapse collapse" data-bs-parent="#acordeonSeta">
                            <div className="accordion-body">
                                {seta.comestibilidad}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        console.log(seta),
        <div>
            {seta ? renderContent() : <div>Cargando...</div>}
        </div>
    );
}

export default DetailMushrooms;