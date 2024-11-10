import React, { useState, useEffect } from 'react';
import Activity from './activity';
import { getActivities } from '../../services/activities';
import { Loader } from '../common/loader/loader';
import { Error } from '../common/error';

const ActivityGallery = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getActivities().then(data => {
            setActivities(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const renderContent = () => {
        if (activities.length === 0) {
            return <div className='text-center'>No se encontraron actividades</div>
        }
        return (
            <div className="container-fluid mt-4 mb-4">
                <div className="row row-cols-1 row-cols-lg-3 g-4">
                    {activities.map((activity, index) => (
                        <div className="col" key={index}>
                            <Activity activity={activity} />
                        </div>
                    ))}
                </div>
                <style jsx global>{`
                .hover-overlay {
                transition: opacity 0.3s ease;
                }
                .card:hover .hover-overlay {
                opacity: 1 !important;
                }
            `}
                </style>
            </div>

        )
    }

    return (
        loading ? <Loader /> : error ? <Error /> : renderContent()
    );
};

export default ActivityGallery;
