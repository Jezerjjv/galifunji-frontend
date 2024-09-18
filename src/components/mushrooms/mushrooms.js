import { Link } from "react-router-dom";
export const Mushrooms = ({ seta }) => {
    return (
        <Link to={`/mushrooms/${seta.id}`}>
        <div className="col" style={{cursor: 'pointer'}}>
            <div className="card h-100">
                <img src={seta.imagenes[0]} className="card-img-top" alt={seta.nombre} />
                <div className="card-body">
                    <h5 className="card-title">{seta.nombre}</h5>
                </div>
            </div>
        </div>
        </Link>
    );
};