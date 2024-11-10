import React from 'react';
import ActivityGallery from './activities/activityGallery';
import { Link } from 'react-router-dom';

const Activities = () => {
    return (
        <>
            <nav aria-label="breadcrumb" className='d-flex justify-content-between align-items-center mb-4'>
                <ol className="breadcrumb" style={{ alignItems: 'center', margin: "0px auto" }} >
                    <li className="breadcrumb-item" >
                        <Link to="/" className='link-breadcrumb' >
                            🏚 Inicio
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/activities" className='link-breadcrumb'>
                            🌳 Actividades
                        </Link>
                    </li>
                </ol>
            </nav>
            <ActivityGallery />
        </>
    );
};

export default Activities;
