import React, { useState, useEffect } from 'react';
import radicante from "../../assets/radicante.png"
import { getMushroomById } from '../../services/mushrooms';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function DetailMushroom() {
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [mushroomData, setMushroomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMushroomById(id).then(data => {
            setMushroomData(data[0]);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [id]);

    const SectionTitle = ({ title }) => (
        <div className="mb-4">
            <h3 className="mb-2">{title}</h3>
            <hr className="border-2 border-primary opacity-75" />
        </div>
    );

    const MorphologyItem = ({ title, description, image }) => (
        <div className="col-md-4 mb-3">
            <div className="card h-100">
                <img src={image} alt={title} className="card-img-top" style={{ height: '150px', objectFit: 'contain' }} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text small">{description}</p>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        return (
            <>

                <nav aria-label="breadcrumb" className='d-flex justify-content-between align-items-center mb-4 mt-4'>
                    <ol className="breadcrumb" style={{ alignItems: 'center', margin: "0px auto" }} >
                        <li className="breadcrumb-item" >
                            <Link to="/" className='link-breadcrumb' >
                                🏚 Inicio
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/start" className='link-breadcrumb'>
                                🍄 Hongos
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {mushroomData.nombre_cientifico}
                        </li>
                    </ol>
                </nav>

                <div className="container py-5">
                    <h1 className="text-center mb-5">{mushroomData.nombre_cientifico}</h1>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div style={{ height: '400px', overflow: 'hidden' }}>
                                    <img
                                        src={mushroomData.imagenes[currentImageIndex]}
                                        alt={mushroomData.nombre}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-center mt-3">
                                        {mushroomData.imagenes.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`btn btn-outline-primary mx-1 ${index === currentImageIndex ? 'active' : ''}`}
                                                style={{ padding: '0.25rem', width: '40px', height: '40px' }}
                                            >
                                                <img src={image} alt={`${mushroomData.nombre} thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('description')}
                                                id="description-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#description"
                                                type="button"
                                                role="tab"
                                                aria-controls="description"
                                                aria-selected={activeTab === 'description'}
                                            >
                                                Descripción
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('information')}
                                                id="information-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#information"
                                                type="button"
                                                role="tab"
                                                aria-controls="information"
                                                aria-selected={activeTab === 'information'}
                                            >
                                                Información
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content mt-3" id="myTabContent">
                                        <div className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`} id="description" role="tabpanel" aria-labelledby="description-tab">
                                            <p>{mushroomData.descripcion}</p>
                                        </div>
                                        <div className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`} id="information" role="tabpanel" aria-labelledby="information-tab">
                                            <SectionTitle title="Morfología" />
                                            <div className="row">
                                                <MorphologyItem
                                                    title="Habitat"
                                                    description={mushroomData.habitat_nombre}
                                                    image={mushroomData.habitat_url}
                                                />
                                                <MorphologyItem
                                                    title="Pie"
                                                    description={mushroomData.tipo_pie_nombre}
                                                    image={mushroomData.tipo_pie_url}
                                                />
                                                <MorphologyItem
                                                    title="Láminas"
                                                    description={mushroomData.tipo_laminas_nombre}
                                                    image={mushroomData.tipo_laminas_url}
                                                />
                                            </div>

                                            <SectionTitle title="Datos Curiosos" />
                                            <p>{mushroomData.datos_curiosos}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div>
            {loading ? <p>Cargando...</p> : error ? <p>Error: {error}</p> : renderContent()}
        </div>
    );
}