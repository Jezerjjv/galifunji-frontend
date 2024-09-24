import { Link } from "react-router-dom";
export const Mushrooms = ({ seta }) => {
    return (
        <Link to={`/mushrooms/${seta.id}`}>
        <div className="col" style={{cursor: 'pointer'}}>
            <div className="card h-100">
                <div className="card-img-container" style={{height: '200px', overflow: 'hidden'}}>
                    <img 
                        src={seta.imagenes[0]} 
                        className="card-img-top" 
                        alt={seta.nombre}
                        style={{objectFit: 'contain', width: '100%', height: '100%'}}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{seta.nombre}</h5>
                </div>
            </div>
        </div>
        </Link>
    );
};