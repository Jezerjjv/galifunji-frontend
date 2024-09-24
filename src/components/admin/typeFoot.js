import React, { useState, useEffect } from 'react';
import { getTypeFoots, createTypeFoot, updateTypeFoot, deleteTypeFootById } from '../../services/typeFoot';
import { uploadImage } from '../../services/uploadImgBB';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

export default function TypeHeadAdmin() {
    const [typeFoots, setTypeFoots] = useState([]);
    const [newTypeFoot, setNewTypeFoot] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [image, setImage] = useState(null);


    useEffect(() => {
        setLoading(true);
        getTypeFoots().then(data => {
            setTypeFoots(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const addTypeFoot = async (e) => {
        e.preventDefault();

        if (newTypeFoot.trim()) {
            if (editingId !== null) {
                updateTypeFoot(editingId, { nombre: newTypeFoot });
                setTypeFoots(typeFoots.map(h =>
                    h.id === editingId ? { ...h, nombre: newTypeFoot } : h
                ));
                setEditingId(null);
            } else {
                const url = await uploadImage(image[0]);
                var nextId = typeFoots.length > 0 ? +typeFoots[typeFoots.length - 1].id + 1 : 1;
                createTypeFoot({ nombre: newTypeFoot, url: url });
                setTypeFoots([...typeFoots, { id: nextId, nombre: newTypeFoot, url: url }]);
            }
            setNewTypeFoot('');
            setImage(null);
        }
    };

    const deleteTypeFoot = (id) => {
        setTypeFoots(typeFoots.filter(h => h.id !== id));
        deleteTypeFootById(id);
    };



    const editTypeFoot = (id) => {
        const typeFoot = typeFoots.find(h => h.id === id);
        if (typeFoot) {
            setNewTypeFoot(typeFoot.nombre);
            setEditingId(id);
        }
    };

    const filteredTypeFoots = typeFoots.filter(typeFoot =>
        typeFoot.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageChange = (e) => {
        const { files } = e.target;
        setImage(files);
    };

    const renderContent = () => {
        return (
            <div className="container mt-4">
                <h2 className="mb-4">Panel Administrativo - Pie</h2>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Agregar Nuevo Pie</h5>
                                <form onSubmit={addTypeFoot}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del pie"
                                            value={newTypeFoot}
                                            onChange={(e) => setNewTypeFoot(e.target.value)}
                                            aria-label="Nombre del nuevo tipo de pie"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={handleImageChange}
                                            aria-label="Imagen del nuevo tipo de pie"
                                            name="imagen"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        + Agregar Tipo de Pie
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
                                placeholder="Buscar tipos de pie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Buscar tipos de pie"
                            />
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Tipos de Pie Existentes</h5>
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
                                            {filteredTypeFoots.map(typeFoot => (
                                                <tr key={typeFoot.id}>
                                                    <td>{typeFoot.id}</td>
                                                    <td>{typeFoot.nombre}</td>
                                                    <td>
                                                        <img width="100" height="100" src={typeFoot.url} alt={typeFoot.nombre} className="img-thumbnail" />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2" aria-label={`Editar ${typeFoot.nombre}`}
                                                            onClick={() => editTypeFoot(typeFoot.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => deleteTypeFoot(typeFoot.id)}
                                                            aria-label={`Eliminar ${typeFoot.nombre}`}
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