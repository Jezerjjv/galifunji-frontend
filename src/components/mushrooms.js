import React, { useState } from 'react'

const Mushrooms = () => {
  const [activeTab, setActiveTab] = useState('comestibles');

  const galeriaComestibles = [
    { nombre: "Champiñón", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Boletus edulis", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Cantharellus cibarius", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Morchella esculenta", imagen: "/placeholder.svg?height=200&width=200" },
  ];

  const galeriaNoComestibles = [
    { nombre: "Fistulina hepatica", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Auricularia auricula-judae", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Schizophyllum commune", imagen: "/placeholder.svg?height=200&width=200" },
  ];

  const galeriaToxicas = [
    { nombre: "Amanita phalloides", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Galerina marginata", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Gyromitra esculenta", imagen: "/placeholder.svg?height=200&width=200" },
    { nombre: "Inocybe erubescens", imagen: "/placeholder.svg?height=200&width=200" },
  ];

  const renderGaleria = (setas) => (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {setas.map((seta, index) => (
        <div key={index} className="col">
          <div className="card h-100">
            <img src={seta.imagen} className="card-img-top" alt={seta.nombre} />
            <div className="card-body">
              <h5 className="card-title">{seta.nombre}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'comestibles':
        return (
          <div>
            <h2 className="mb-4">Setas Comestibles</h2>
            <p>Las setas comestibles son aquellas que son seguras para el consumo humano. Algunas de las más populares incluyen:</p>
            {renderGaleria(galeriaComestibles)}
            <p className="mt-4">Recuerda siempre consultar con un experto antes de consumir setas silvestres.</p>
          </div>
        );
      case 'noComestibles':
        return (
          <div>
            <h2 className="mb-4">Setas No Comestibles</h2>
            <p>Las setas no comestibles son aquellas que, aunque no son tóxicas, no son adecuadas para el consumo debido a su sabor, textura o dificultad para digerirlas. Algunos ejemplos son:</p>
            {renderGaleria(galeriaNoComestibles)}
            <p className="mt-4">Estas setas no son venenosas, pero tampoco son recomendables para comer.</p>
          </div>
        );
      case 'toxicas':
        return (
          <div>
            <h2 className="mb-4">Setas Tóxicas</h2>
            <p>Las setas tóxicas son peligrosas y pueden causar graves problemas de salud si se consumen. Algunas de las más peligrosas incluyen:</p>
            {renderGaleria(galeriaToxicas)}
            <p className="mt-4">Nunca consumas setas que no puedas identificar con absoluta certeza. En caso de sospecha de intoxicación, busca atención médica inmediatamente.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Categorías de Setas</h1>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'comestibles' ? 'active' : ''}`} 
            onClick={() => setActiveTab('comestibles')}
          >
            Comestibles
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'noComestibles' ? 'active' : ''}`} 
            onClick={() => setActiveTab('noComestibles')}
          >
            No Comestibles
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'toxicas' ? 'active' : ''}`} 
            onClick={() => setActiveTab('toxicas')}
          >
            Tóxicas
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Mushrooms