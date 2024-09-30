import React, { useState, useEffect } from 'react';
import { createRecipe, updateRecipe, getRecipes, deleteRecipe } from '../../services/recipes';
import { uploadImage } from '../../services/uploadImgBB';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

export default function RecipeAdmin() {
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [newRecipe, setNewRecipe] = useState({
        nombre: "",
        descripcion: "",
        instrucciones: "",
        tiempo_preparacion: 0,
        ingredientes: ""
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setLoading(true);
        getRecipes().then(data => {
            setRecipes(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);



    const handleDelete = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        deleteRecipe(id);
    };

    const handleEdit = (recipe) => {
        setEditingRecipe(recipe);
    };

    const handleSave = async () => {
        if (editingRecipe) {
            await updateRecipe(editingRecipe.id, editingRecipe);
            setRecipes(recipes.map(r => r.id === editingRecipe.id ? editingRecipe : r));
            setEditingRecipe(null);
        } else {
            const uploadPromises = Array.from(images).map(image => uploadImage(image));
            const uploadedUrls = await Promise.all(uploadPromises);
            const recipeToSubmit = {
                ...newRecipe,
                imagenes: uploadedUrls
            };
            createRecipe(recipeToSubmit);
            var nextId = recipes.length > 0 ? +recipes[recipes.length - 1].id + 1 : 1;
            setRecipes([...recipes, { ...recipeToSubmit, nextId }]);
            setNewRecipe({
                nombre: "",
                descripcion: "",
                instrucciones: "",
                tiempo_preparacion: 0,
                ingredientes: ""
            });
        }
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingRecipe({ ...editingRecipe, [name]: value });
        } else {
            setNewRecipe({ ...newRecipe, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const { files } = e.target;
        setImages(files);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

    const renderRecipes = () => {
        return (
            <div className="container-fluid">
                <h2 className="mb-4">Recetas</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Gestión de Recetas</h4>
                        <div className="d-flex justify-content-end align-items-center mb-3">
                            <div className="input-group me-2" style={{ width: "300px" }}>
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar recetas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" onClick={() => setEditingRecipe(null)}>
                                <i className="bi bi-plus-circle me-1"></i> Nueva Receta
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Tiempo de Preparación</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((recipe) => (
                                        <tr key={recipe.id}>
                                            <td>{recipe.id}</td>
                                            <td>{recipe.nombre}</td>
                                            <td>{recipe.descripcion}</td>
                                            <td>{recipe.tiempo_preparacion} min</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(recipe)} data-bs-toggle="modal" data-bs-target="#recipeModal">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(recipe.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav>
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: Math.ceil(filteredRecipes.length / itemsPerPage) }, (_, i) => (
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
                <div className="modal fade" id="recipeModal" tabIndex="-1" aria-labelledby="recipeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="recipeModalLabel">{editingRecipe ? 'Editar Receta' : 'Nueva Receta'}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre"
                                            value={editingRecipe ? editingRecipe.nombre : newRecipe.nombre}
                                            onChange={(e) => handleInputChange(e, !!editingRecipe)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                                        <textarea className="form-control" id="descripcion" name="descripcion" rows="3"
                                            value={editingRecipe ? editingRecipe.descripcion : newRecipe.descripcion}
                                            onChange={(e) => handleInputChange(e, !!editingRecipe)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="instrucciones" className="form-label">Instrucciones</label>
                                        <textarea className="form-control" id="instrucciones" name="instrucciones" rows="3"
                                            value={editingRecipe ? editingRecipe.instrucciones : newRecipe.instrucciones}
                                            onChange={(e) => handleInputChange(e, !!editingRecipe)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tiempo_preparacion" className="form-label">Tiempo de Preparación (minutos)</label>
                                        <input type="number" className="form-control" id="tiempo_preparacion" name="tiempo_preparacion"
                                            value={editingRecipe ? editingRecipe.tiempo_preparacion : newRecipe.tiempo_preparacion}
                                            onChange={(e) => handleInputChange(e, !!editingRecipe)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ingredientes" className="form-label">Ingredientes</label>
                                        <textarea className="form-control" id="ingredientes" name="ingredientes" rows="3"
                                            value={editingRecipe ? editingRecipe.ingredientes : newRecipe.ingredientes}
                                            onChange={(e) => handleInputChange(e, !!editingRecipe)}></textarea>
                                    </div>
                                    {!editingRecipe && (
                                        <div className="mb-3">
                                            <label htmlFor="images" className="form-label">Imágenes</label>
                                            <input type="file" className="form-control" id="images" multiple onChange={handleImageChange} />
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        loading ? <Loader /> : error ? <Error /> : renderRecipes()
    );
}