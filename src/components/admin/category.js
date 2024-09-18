import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getCategories, createCategory, deleteCategoryById, updateCategory } from '../../services/category';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

export default function CategoryAdminPanel() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getCategories().then(data => {
            setCategories(data);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            setError("Error fetching categories");
        });
    }, []);

    const addCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim()) {
            if (editingId !== null) {
                updateCategory(editingId, { nombre: newCategory });
                setCategories(categories.map(cat =>
                    cat.id === editingId ? { ...cat, nombre: newCategory } : cat
                ));
                setEditingId(null);
            } else {
                createCategory({ nombre: newCategory });
                setCategories([...categories, { id:+categories[categories.length-1].id+1, nombre: newCategory }]);
            }
            setNewCategory('');
        }
    };

    const deleteCategory = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
        deleteCategoryById(id);
    };

    const editCategory = (id) => {
        const category = categories.find(cat => cat.id === id);
        if (category) {
            setNewCategory(category.nombre);
            setEditingId(id);
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const renderContent = () => {

        return (
            <div className="container mt-4 mb-4">
                <h1 className="mb-4">Panel Administrativo - Categorías</h1>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-3">
                                    {editingId !== null ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                                </h5>
                                <form onSubmit={addCategory}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre de la categoría"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        <i className={`bi ${editingId !== null ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                                        {editingId !== null ? 'Actualizar Categoría' : 'Agregar Categoría'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar categorías..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Categorías Existentes</h5>
                                {filteredCategories.length === 0 ? (
                                    <p className="text-muted">No hay categorías que coincidan con la búsqueda.</p>
                                ) : (
                                    <ul className="list-group">
                                        {filteredCategories.map((category) => (
                                            <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>{category.id}</div>
                                                <div>{category.nombre}</div>

                                                <div>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() => editCategory(category.id)}
                                                        title="Editar"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => deleteCategory(category.id)}
                                                        title="Eliminar"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        loading ? <Loader /> : error ? <Error /> : renderContent()
    );
}