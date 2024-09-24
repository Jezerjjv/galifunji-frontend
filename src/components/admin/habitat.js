import React, { useState, useEffect } from 'react';
import { getHabitats, createHabitat, updateHabitat, deleteHabitatById } from '../../services/habitat';
import { uploadImage } from '../../services/uploadImgBB';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

export default function HabitatAdmin() {
    const [habitats, setHabitats] = useState([]);
    const [newHabitat, setNewHabitat] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [imagen, setImagen] = useState(null);

    useEffect(() => {
        setLoading(true);
        getHabitats().then(data => {
            setHabitats(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
            console.error(error);
        });
    }, []);

    const addHabitat = async (e) => {
        e.preventDefault();
        if (newHabitat.trim()) {
            if (editingId !== null) {
                updateHabitat(editingId, { nombre: newHabitat });
                setHabitats(habitats.map(h =>
                    h.id === editingId ? { ...h, nombre: newHabitat } : h
                ));
                setEditingId(null);
            } else {
                const url = await uploadImage(imagen);
                var nextId = habitats.length > 0 ? +habitats[habitats.length - 1].id + 1 : 1;
                createHabitat({ nombre: newHabitat, url: url });
                setHabitats([...habitats, { id: nextId, nombre: newHabitat, url: url}]);
            }
            setNewHabitat('');
            setImagen(null);
        }
    };

    const deleteHabitat = (id) => {
        try {
            setHabitats(habitats.filter(h => h.id !== id));
            deleteHabitatById(id);
        } catch (error) {
            console.error("Error al eliminar el hábitat");
        }
    };

    const editHabitat = (id) => {
        const habitat = habitats.find(h => h.id === id);
        if (habitat) {
            setNewHabitat(habitat.nombre);
            setEditingId(id);
            updateHabitat({ id: id, nombre: newHabitat.trim() });
        }
    };

    const filteredHabitats = habitats.filter(habitat =>
        habitat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderContent = () => {
        return (
            <div className="container mt-4">
                <h2 className="mb-4">Panel Administrativo - Hábitats</h2>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Agregar Nuevo Hábitat</h5>
                                <form onSubmit={addHabitat}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del hábitat"
                                            value={newHabitat}
                                            onChange={(e) => setNewHabitat(e.target.value)}
                                            aria-label="Nombre del nuevo hábitat"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setImagen(e.target.files[0])}
                                            aria-label="Seleccionar imagen"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        + Agregar Hábitat
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar hábitats..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Buscar hábitats"
                            />
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Hábitats Existentes</h5>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Imagen</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHabitats.map(habitat => (
                                                <tr key={habitat.id}>
                                                    <td>{habitat.id}</td>
                                                    <td>{habitat.nombre}</td>
                                                    <td>
                                                        <img src={habitat.url} alt={habitat.nombre} className="img-thumbnail" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary me-2" 
                                                            aria-label={`Editar ${habitat.nombre}`}
                                                            onClick={() => editHabitat(habitat.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => deleteHabitat(habitat.id)}
                                                            aria-label={`Eliminar ${habitat.name}`}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {loading ? <Loader /> : error ? <Error /> : renderContent()}
        </>
    );
}