import React, { useState, useEffect } from 'react';
import { getMushroomsMagic } from '../services/mushrooms';
import { GaleryMushrooms } from './mushrooms/galeryMushrooms'
import { Loader } from './common/loader/loader'
import { Error } from './common/error'
import { Link } from 'react-router-dom';
const MagicMushrooms = () => {

    const [setas, setSetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [setasData] = await Promise.all([
                    getMushroomsMagic(),
                ]);
                setSetas(setasData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const renderMushrooms = () => {
        return (
            setas.length > 0 ?
                <div className="container my-5">
                    <div className="tab-content">
                        <GaleryMushrooms setas={setas} />
                    </div>
                </div>
                : <h1 className='text-center my-5'>No hay setas 😅</h1>
        )
    }

    return (
        <>
            <nav aria-label="breadcrumb" className='d-flex justify-content-between align-items-center mb-4'>
                <ol className="breadcrumb" style={{ alignItems: 'center', margin: "0px auto" }}>
                    <li className="breadcrumb-item" >
                        <Link to="/" className='link-breadcrumb' >
                            🏚 Inicio
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/magic-mushrooms" className='link-breadcrumb'>
                            🍄 Hongos mágicos 🌿
                        </Link>
                    </li>
                </ol>
            </nav>
            {loading ? <Loader /> : error ? <Error error={error} /> : renderMushrooms()}
        </>
    );
};

export default MagicMushrooms;