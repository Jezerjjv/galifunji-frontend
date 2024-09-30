import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { setIsMagic, setIsMedicinal, getMushroomsAll, deleteMushroomById, addMushroom, updateMushroom } from '../../services/mushrooms';
import { uploadImage } from '../../services/uploadImgBB';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';
import { getCategories } from '../../services/category';
import { getTypeHeads } from '../../services/typeHead';
import { getTypeFoots } from '../../services/typeFoot';
import { getHabitats } from '../../services/habitat';

export default function Component() {
    const [editingMushroom, setEditingMushroom] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [mushrooms, setMushrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [typeHeads, setTypeHeads] = useState([]);
    const [typeFoots, setTypeFoots] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, typeHeadsData, typeFootsData, habitatsData, mushroomsData] = await Promise.all([
                    getCategories(),
                    getTypeHeads(),
                    getTypeFoots(),
                    getHabitats(),
                    getMushroomsAll()
                ]);

                setCategories(categoriesData);
                setTypeHeads(typeHeadsData);
                setTypeFoots(typeFootsData);
                setHabitats(habitatsData);
                setMushrooms(mushroomsData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (mushroom) => {
        setEditingMushroom({ ...mushroom });
        setIsAdding(false);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setMushrooms(mushrooms.filter(mushroom => mushroom.id !== id));
        deleteMushroomById(id);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingMushroom(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    };
    
    const handleImageChange = (e) => {
        const { files } = e.target;
        setImages(files);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadPromises = Array.from(images).map(image => uploadImage(image));
        const uploadedUrls = await Promise.all(uploadPromises);
        
        const mushroomToSubmit = {
            ...editingMushroom,
            magica: editingMushroom.magica || false,
            medicinal: editingMushroom.medicinal || false,
            imagenes: uploadedUrls
        };
        if (isAdding) {
            var nextId = mushrooms.length > 0 ? mushrooms[mushrooms.length - 1].id + 1 : 1;
            addMushroom(mushroomToSubmit);
            setMushrooms([...mushrooms, { ...mushroomToSubmit, id: nextId }]);
        } else {
            updateMushroom(mushroomToSubmit);
            setMushrooms(mushrooms.map(mushroom => mushroom.id === mushroomToSubmit.id ? mushroomToSubmit : mushroom));
        }
        setShowModal(false);
        setEditingMushroom(null);
        setIsAdding(false);
    };

    const handleCheckboxChange = async (field, id, checked) => {
        try {
            if (field === "magic") {
                await setIsMagic(id, checked);
                setMushrooms(prevMushrooms => prevMushrooms.map(mushroom =>
                    mushroom.id === id ? { ...mushroom, magica: checked } : mushroom
                ));
            }
            if (field === "medicinal") {
                await setIsMedicinal(id, checked);
                setMushrooms(prevMushrooms => prevMushrooms.map(mushroom =>
                    mushroom.id === id ? { ...mushroom, medicinal: checked } : mushroom
                ));
            }

        } catch (error) {
            console.error("Error al cambiar el estado mágico:", error);
            // Preguntar si lo ponemos mas pro con avisos de creacion y errores al usuario
        }
    };

    const filteredMushrooms = mushrooms.filter(mushroom =>
        mushroom.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMushrooms.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const renderContent = () => {
        return (<div className="container-fluid">
            <div className="row">
                <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Gestión de Setas</h1>
                        <div className="d-flex">
                            <div className="input-group me-2">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar setas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button
                                style={{ width: "300px" }}
                                className="btn btn-primary"
                                onClick={() => { setIsAdding(true); setEditingMushroom({}); setShowModal(true); }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Nueva Seta
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Nombre Científico</th>
                                    <th>Descripción</th>
                                    <th>Mágica</th>
                                    <th>Medicinal</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(mushroom => (
                                    <tr key={mushroom.id}>
                                        <td>{mushroom.id}</td>
                                        <td>{mushroom.nombre}</td>
                                        <td>{mushroom.nombre_cientifico}</td>
                                        <td>{mushroom.descripcion}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={mushroom.magica}
                                                onChange={(e) => handleCheckboxChange("magic", mushroom.id, e.target.checked)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={mushroom.medicinal}
                                                onChange={(e) => handleCheckboxChange("medicinal", mushroom.id, e.target.checked)}
                                            />
                                        </td>
                                        <td>{mushroom.categoria_nombre}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(mushroom)}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(mushroom.id)}>
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
                            {Array.from({ length: Math.ceil(filteredMushrooms.length / itemsPerPage) }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </main>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isAdding ? 'Agregar Nueva Seta' : 'Editar Seta'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="nombre" value={editingMushroom?.nombre || ''} onChange={handleChange} placeholder="Nombre" required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="nombre_cientifico" value={editingMushroom?.nombre_cientifico || ''} onChange={handleChange} placeholder="Nombre Científico" required />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" name="datos_curiosos" value={editingMushroom?.datos_curiosos || ''} onChange={handleChange} placeholder="Datos Curiosos"></textarea>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" name="descripcion" value={editingMushroom?.descripcion || ''} onChange={handleChange} placeholder="Descripción"></textarea>
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <label htmlFor="magica" className="form-label">Mágica</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="magica"
                                    checked={editingMushroom?.magica || false}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <label htmlFor="medicinal" className="form-label">Medicinal</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input mr-2 ml-2"
                                    name="medicinal"
                                    checked={editingMushroom?.medicinal || false}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" name="categoria_id" value={editingMushroom?.categoria_id || ''} onChange={handleChange} required>
                                <option value="">Seleccione una categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" name="tipo_laminas_id" value={editingMushroom?.tipo_laminas_id || ''} onChange={handleChange} required>
                                <option value="">Seleccione un tipo de cabezal</option>
                                {typeHeads.map(typeHead => (
                                    <option key={typeHead.id} value={typeHead.id}>{typeHead.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" name="tipo_pie_id" value={editingMushroom?.tipo_pie_id || ''} onChange={handleChange} required>
                                <option value="">Seleccione un tipo de pie</option>
                                {typeFoots.map(typeFoot => (
                                    <option key={typeFoot.id} value={typeFoot.id}>{typeFoot.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" name="habitat_id" value={editingMushroom?.habitat_id || ''} onChange={handleChange} required>
                                <option value="">Seleccione un hábitat</option>
                                {habitats.map(habitat => (
                                    <option key={habitat.id} value={habitat.id}>{habitat.nombre}</option>
                                ))}
                            </select>
                        </div>
                        {isAdding && (
                            <>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        multiple
                                        className="form-control"
                                        name="imagenes"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {isAdding ? 'Agregar' : 'Actualizar'}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
        )
    }
    return (
        loading ? <Loader /> : error ? <Error /> : renderContent()
    );
}