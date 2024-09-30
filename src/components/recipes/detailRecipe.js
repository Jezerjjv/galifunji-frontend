import React from 'react';
import './detailRecipe.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../../services/recipes';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';
const DetailRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    useEffect(() => {
        setLoading(true);
        getRecipeById(id)
            .then(data => {
                console.log(data);
                setRecipe(data[0]);
                setSelectedImage(0);
                setIngredients(data[0].ingredientes.split("\n"));
                setInstructions(data[0].instrucciones.split("\n"));
                setLoading(false);

            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const renderContent = () => {
        return (
            <div className="detail-container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" >
                        <li className="breadcrumb-item" >
                            <Link to="/" className='link-breadcrumb' >
                                🏚 Inicio
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/recipes" className='link-breadcrumb'>
                                🍽 Recetas
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {recipe.nombre}
                        </li>
                    </ol>
                </nav>
                <h1 className="recipe-title">{recipe.nombre}</h1>
                <div className="recipe-header">
                    <div className="col-md-12 mb-6">
                        <div className="card h-100">
                            <div
                                style={{ height: '400px', overflow: 'hidden', position: 'relative' }}
                                onMouseEnter={() => setShowDescription(true)}
                                onMouseLeave={() => setShowDescription(false)}
                            >
                                <img
                                    src={recipe.imagenes[selectedImage]}
                                    alt={recipe.nombre}
                                    className="card-img-top"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                                {showDescription && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                            padding: '50px',
                                            overflow: 'auto'
                                        }}
                                    >
                                        <p style={{ textAlign: 'center', lineHeight: '1.5' }}>{recipe.descripcion}</p>
                                    </div>
                                )}
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-center mt-3">
                                    {recipe.imagenes.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`btn btn-outline-primary mx-1 ${index === selectedImage ? 'active' : ''}`}
                                            style={{ padding: '0.25rem', width: '40px', height: '40px' }}
                                        >
                                            <img src={image} alt={`${recipe.nombre} thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recipe-content">
                    <div className="recipe-steps">
                        <h2>Preparación</h2>
                        <ul>
                            {instructions.map((step, index) => (
                                <li key={index}>{`${index + 1}. ${step}`}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="recipe-ingredients">
                        <h2>Ingredientes</h2>
                        <ul>
                            {ingredients.map((ingrediente, index) => (
                                <li key={index}>{ingrediente}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        loading ? <Loader /> : error ? <Error /> : renderContent()
    );
}

export default DetailRecipe;
