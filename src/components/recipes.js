import React, { useEffect, useState } from 'react';
import GaleryRecipes from './recipes/galeryRecipes';
import { getRecipes } from '../services/recipes';
import { Loader } from './common/loader/loader';
import { Error } from './common/error';
import { Link } from 'react-router-dom';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getRecipes().then(data => {
            setRecipes(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        })
    }, []);

    const renderContent = () => {
        if (recipes.length === 0) {
            return <div>No se encontraron recetas 🍽</div>
        }
        return (
            <>
                <nav aria-label="breadcrumb" className='d-flex justify-content-between align-items-center mb-4'>
                    <ol className="breadcrumb" style={{alignItems: 'center', margin:"0px auto"}} >
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
                    </ol>
                </nav>
                <GaleryRecipes recipes={recipes} />
            </>
        )
    }

    return (
        loading ? <Loader /> : error ? <Error /> : renderContent()
    );
}

export default Recipes;