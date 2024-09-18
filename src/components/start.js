import React, { useState, useEffect } from 'react'
import { getMushrooms } from '../services/mushrooms'
import { GaleryMushrooms } from './mushrooms/galeryMushrooms'
import { Loader } from './common/loader/loader'
import { Error } from './common/error'

const Start = () => {
  const COMESTIBLE = 1;
  const NO_COMENSTIBLE = 2;
  const TOXICO = 3;
  const [activeTab, setActiveTab] = useState(1);
  const [setas, setSetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getMushrooms()
      .then((data) => {
        console.log(data);
        setSetas(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError("Error fetching mushrooms");
      })

  }, []);



  const renderContent = () => {
    switch (activeTab) {
      case COMESTIBLE:
        return (
          <div>
            <h2 className="mb-4">Setas Comestibles</h2>
            <p>Las setas comestibles son aquellas que son seguras para el consumo humano. Algunas de las más populares incluyen:</p>
            <GaleryMushrooms setas={setas.filter(seta => +seta.categoria_id === COMESTIBLE)} />
            <p className="mt-4">Recuerda siempre consultar con un experto antes de consumir setas silvestres.</p>
          </div>
        );
      case NO_COMENSTIBLE:
        return (
          <div>
            <h2 className="mb-4">Setas No Comestibles</h2>
            <p>Las setas no comestibles son aquellas que, aunque no son tóxicas, no son adecuadas para el consumo debido a su sabor, textura o dificultad para digerirlas. Algunos ejemplos son:</p>
            <GaleryMushrooms setas={setas.filter(seta => +seta.categoria_id === NO_COMENSTIBLE)} />
            <p className="mt-4">Estas setas no son venenosas, pero tampoco son recomendables para comer.</p>
          </div>
        );
      case TOXICO:
        return (
          <div>
            <h2 className="mb-4">Setas Tóxicas</h2>
            <p>Las setas tóxicas son peligrosas y pueden causar graves problemas de salud si se consumen. Algunas de las más peligrosas incluyen:</p>
            <GaleryMushrooms setas={setas.filter(seta => +seta.categoria_id === TOXICO)} />
            <p className="mt-4">Nunca consumas setas que no puedas identificar con absoluta certeza. En caso de sospecha de intoxicación, busca atención médica inmediatamente.</p>
          </div>
        );
      default:
        return null;
    }
  };


  const renderMushrooms = () => {
    return (
      <div className="container my-5">
        <h1 className="mb-4">Categorías de Setas</h1>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === COMESTIBLE ? 'active' : ''}`}
              onClick={() => setActiveTab(COMESTIBLE)}
            >
              Comestibles
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === NO_COMENSTIBLE ? 'active' : ''}`}
              onClick={() => setActiveTab(NO_COMENSTIBLE)}
            >
              No Comestibles
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === TOXICO ? 'active' : ''}`}
              onClick={() => setActiveTab(TOXICO)}
            >
              Tóxicas
            </button>
          </li>
        </ul>
        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    )
  }

  return (
    <>
      {loading ? <Loader /> : error ? <Error error={error} /> : renderMushrooms()}
    </>
  );

}

export default Start