import React, { useState, useEffect } from 'react';
import { getTypeHeads, createTypeHead, updateTypeHead, deleteTypeHeadById } from '../../services/typeHead';
import { uploadImage } from '../../services/uploadImgBB';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

export default function TypeHeadAdmin() {
    const [typeHeads, setTypeHeads] = useState([]);
    const [newTypeHead, setNewTypeHead] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setLoading(true);
        getTypeHeads().then(data => {
            setTypeHeads(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
            console.error(error);
        });
    }, []);

    const addTypeHead = async (e) => {
        e.preventDefault();

        if (newTypeHead.trim()) {
            if (editingId !== null) {
                updateTypeHead(editingId, { nombre: newTypeHead });
                setTypeHeads(typeHeads.map(h =>
                    h.id === editingId ? { ...h, nombre: newTypeHead } : h
                ));
                setEditingId(null);
            } else {
                const url = await uploadImage(image);
                var nextId = typeHeads.length > 0 ? +typeHeads[typeHeads.length - 1].id + 1 : 1;
                createTypeHead({ nombre: newTypeHead, url: url });
                setTypeHeads([...typeHeads, { id: nextId, nombre: newTypeHead, url: url }]);
            }
            setNewTypeHead('');
            setImage(null);
        }
    };

    const deleteTypeHead = (id) => {
        setTypeHeads(typeHeads.filter(h => h.id !== id));
        deleteTypeHeadById(id);
    };

    const editTypeHead = (id) => {
        const typeHead = typeHeads.find(h => h.id === id);
        if (typeHead) {
            setNewTypeHead(typeHead.nombre);
            setEditingId(id);
        }
    };

    const filteredTypeHeads = typeHeads.filter(typeHead =>
        typeHead.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <form onSubmit={addTypeHead}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del hábitat"
                                            value={newTypeHead}
                                            onChange={(e) => setNewTypeHead(e.target.value)}
                                            aria-label="Nombre del nuevo hábitat"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            aria-label="Seleccionar imagen"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        + Agregar Tipo de Lámina
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
                                <h5 className="card-title">Tipos de Láminas Existentes</h5>
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
                                            {filteredTypeHeads.map(typeHead => (
                                                <tr key={typeHead.id}>
                                                    <td>{typeHead.id}</td>
                                                    <td>{typeHead.nombre}</td>
                                                    <td>
                                                        <img width="100" height="100" src={typeHead.url} alt={typeHead.nombre} className="img-thumbnail" />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2" aria-label={`Editar ${typeHead.nombre}`}
                                                            onClick={() => editTypeHead(typeHead.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => deleteTypeHead(typeHead.id)}
                                                            aria-label={`Eliminar ${typeHead.nombre}`}
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