import React, { useState, useEffect } from 'react'
import { getMushrooms } from '../services/mushrooms'
import { getCategories } from '../services/category'
import { GaleryMushrooms } from './mushrooms/galeryMushrooms'
import { Loader } from './common/loader/loader'
import { Error } from './common/error'

const Start = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [setas, setSetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, setasData] = await Promise.all([
          getCategories(),
          getMushrooms()
        ]);
        setCategories(categoriesData);
        setSetas(setasData);
        setActiveTab(categoriesData[0]?.id || null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    const category = categories.find(cat => cat.id === activeTab);
    if (!category) return null;

    return (
      <div>
        <h2 className="mb-4">{category.nombre}</h2>
        <p>{category.descripcion}</p>
        {console.log(setas.filter(seta => +seta.categoria_id === +activeTab))}
        <GaleryMushrooms setas={setas.filter(seta => +seta.categoria_id === +activeTab)} />
        <p className="mt-4">{category.advertencia}</p>
      </div>
    );
  };

  const renderMushrooms = () => {

    return (
      categories.length > 0 ?
        <div className="container my-5">
          <h1 className="mb-4">Categorías de Setas</h1>
          <ul className="nav nav-tabs mb-4">
            {categories.map(category => (
              <li className="nav-item" key={category.id}>
                <button
                  className={`nav-link ${activeTab === category.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.nombre}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            {renderContent()}
          </div>
        </div>
        : <h1 className='text-center my-5'>No hay setas 😅</h1>
    )
  }

  return (
    <>
      {loading ? <Loader /> : error ? <Error error={error} /> : renderMushrooms()}
    </>
  );

}

export default Start