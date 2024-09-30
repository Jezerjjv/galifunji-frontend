import React from 'react';
import { Link } from 'react-router-dom';
import './galeryRecipes.css';

const GaleryRecipes = ({ recipes }) => {

    return (
        <div className="galery-container">
            {recipes.map((recipe, index) => (
                <Link to={`/recipes/${recipe.id}`} key={index} className="recipe-card">
                    <img src={recipe.imagenes[0]} alt={recipe.nombre} className="recipe-image" />
                    <h3 className="recipe-title">{recipe.nombre}</h3>
                </Link>
            ))}
        </div>
    );
}

export default GaleryRecipes;
