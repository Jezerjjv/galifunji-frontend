import React, { useState, useEffect } from 'react';
import { createActivity, updateActivity, getActivities, deleteActivity } from '../../services/activities';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

export default function RecipeAdmin() {
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingActivity, setEditingActivity] = useState(null);
    const [newActivity, setNewActivity] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        fecha_inicio: "",
        fecha_fin: "",
        ubicacion: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        setLoading(true);
        getActivities().then(data => {
            console.log(data);
            setActivities(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);



    const handleDelete = (id) => {
        setActivities(activities.filter(activity => activity.id !== id));
        deleteActivity(id);
    };

    const handleEdit = (activity) => {
        setEditingActivity(activity);
    };

    const handleSave = async () => {
        if (editingActivity) {
            await updateActivity(editingActivity.id, editingActivity);
            setActivities(activities.map(a => a.id === editingActivity.id ? editingActivity : a));
            setEditingActivity(null);
        } else {
            const activityToSubmit = {
                ...newActivity,
            };
            createActivity(activityToSubmit);
            var nextId = activities.length > 0 ? +activities[activities.length - 1].id + 1 : 1;
            setActivities([...activities, { ...activityToSubmit, nextId }]);
            setNewActivity({
                nombre: "",
                descripcion: "",
                precio: "",
                fecha_inicio: "",
                fecha_fin: "",
                ubicacion: ""
            });
        }
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            console.log(value);
            setEditingActivity({ ...editingActivity, [name]: value });
        } else {
            setNewActivity({ ...newActivity, [name]: value });
        }
    };

    const filteredActivities = activities.filter(activity =>
        activity.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

    const renderActivities = () => {
        return (
            <div className="container-fluid">
                <h2 className="mb-4">Actividades</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Gestión de Actividades</h4>
                        <div className="d-flex justify-content-end align-items-center mb-3">
                            <div className="input-group me-2" style={{ width: "300px" }}>
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar actividades..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#activityModal" onClick={() => setEditingActivity(null)}>
                                <i className="bi bi-plus-circle me-1"></i> Nueva Actividad
                            </button>
                        </div>
                        {currentItems.length === 0 ? (
                            <div className="alert alert-warning" role="alert">
                                No se encontraron actividades.
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                            <th>Fecha de Inicio</th>
                                            <th>Fecha de Fin</th>
                                            <th>Ubicación</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((activity) => (
                                            <tr key={activity.id}>
                                                <td>{activity.id}</td>
                                                <td>{activity.nombre}</td>
                                                <td>{activity.descripcion}</td>
                                                <td>{activity.precio}</td>
                                                <td>{(activity.fecha_inicio)}</td>
                                                <td>{activity.fecha_fin}</td>
                                                <td>{activity.ubicacion}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(activity)} data-bs-toggle="modal" data-bs-target="#activityModal">
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(activity.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        < nav >
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: Math.ceil(filteredActivities.length / itemsPerPage) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Modal para añadir/editar receta */}
                <div className="modal fade" id="activityModal" tabIndex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="activityModalLabel">{editingActivity ? 'Editar Actividad' : 'Nueva Actividad'}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre"
                                            value={editingActivity ? editingActivity.nombre : newActivity.nombre}
                                            onChange={(e) => handleInputChange(e, !!editingActivity)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                                        <textarea className="form-control" id="descripcion" name="descripcion" rows="3"
                                            value={editingActivity ? editingActivity.descripcion : newActivity.descripcion}
                                            onChange={(e) => handleInputChange(e, !!editingActivity)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="precio" className="form-label">Precio</label>
                                        <input type="number" className="form-control" id="precio" name="precio"
                                            value={editingActivity ? editingActivity.precio : newActivity.precio}
                                            onChange={(e) => handleInputChange(e, !!editingActivity)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fecha_inicio" className="form-label">Fecha de Inicio</label>
                                        <input type="date" className="form-control" id="fecha_inicio" name="fecha_inicio"
                                            value={editingActivity ? editingActivity.fecha_inicio : newActivity.fecha_inicio}
                                            onChange={(e) => handleInputChange(e, !!editingActivity)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fecha_fin" className="form-label">Fecha de Fin</label>
                                        <input type="date" format="yyyy-MM-dd" className="form-control" id="fecha_fin" name="fecha_fin" 
                                            value={editingActivity ? editingActivity.fecha_fin : newActivity.fecha_fin}
                                            onChange={(e) => handleInputChange(e, !!editingActivity)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                                        <input type="text" className="form-control" id="ubicacion" name="ubicacion"
                                            value={editingActivity ? editingActivity.ubicacion : newActivity.ubicacion}
                                            onChange={(e) => handleInputChange(e, !!editingActivity)} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <>
            {loading ? <Loader /> : error ? <Error /> : renderActivities()}
        </>
    );
}