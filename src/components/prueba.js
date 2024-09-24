import React, { useState } from 'react';
import radicante from "../assets/radicante.png"
const mushroomData = {
  id: 1,
  name: "Amanita muscaria",
  scientificName: "Amanita muscaria (L.) Lam.",
  images: [
    "https://plus.unsplash.com/premium_photo-1663127475022-fb71dcb1326a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1665138322396-1e8a20b762ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1591189863430-ab87e120f312?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1601230817010-065a3a535776?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  description: "La Amanita muscaria es una seta conocida por su característico sombrero rojo con manchas blancas. Es una de las setas más reconocibles y está presente en muchos cuentos de hadas y obras de arte. A pesar de su belleza, es importante tener en cuenta que esta seta es tóxica y no debe ser consumida.",
  morphology: {
    cap: {
      description: "Rojo brillante con manchas blancas, convexo a plano, 8-20 cm de diámetro.",
      image: "/placeholder.svg?height=200&width=200&text=Sombrero"
    },
    stem: {
      description: "Blanco, robusto, 8-25 cm de alto, con un anillo y una volva en la base.",
      image: "/placeholder.svg?height=200&width=200&text=Pie"
    },
    gills: {
      description: "Blancas, libres o ligeramente adheridas al pie.",
      image: "/placeholder.svg?height=200&width=200&text=Láminas"
    }
  },
  habitat: "Bosques de coníferas y caducifolios, especialmente asociada con abedules y pinos. Se encuentra en América del Norte, Europa y partes de Asia.",
  edibility: "No comestible. Tóxica y con propiedades alucinógenas.",
  funFacts: [
    "A pesar de su toxicidad, ha sido utilizada en prácticas chamánicas por algunas culturas.",
    "El color rojo del sombrero se debe a un pigmento llamado muscapurpurina.",
    "Los vikingos posiblemente consumían esta seta antes de entrar en batalla, lo que podría explicar su comportamiento 'berserker'."
  ]
};

export default function MushroomDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const SectionTitle = ({ title }) => (
    <div className="mb-4">
      <h3 className="mb-2">{title}</h3>
      <hr className="border-2 border-primary opacity-75" />
    </div>
  );

  const MorphologyItem = ({ title, description, image }) => (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <img src={image} alt={title} className="card-img-top" style={{height: '150px', objectFit: 'contain'}} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text small">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">{mushroomData.name}</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div style={{height: '400px', overflow: 'hidden'}}>
              <img 
                src={mushroomData.images[currentImageIndex]} 
                alt={mushroomData.name} 
                className="card-img-top"
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center mt-3">
                {mushroomData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`btn btn-outline-primary mx-1 ${index === currentImageIndex ? 'active' : ''}`}
                    style={{padding: '0.25rem', width: '40px', height: '40px'}}
                  >
                    <img src={image} alt={`${mushroomData.name} thumbnail ${index + 1}`} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2>{mushroomData.name}</h2>
          <p className="text-muted">{mushroomData.scientificName}</p>
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
              <p>{mushroomData.description}</p>
            </div>
            <div className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`} id="information" role="tabpanel" aria-labelledby="information-tab">
              <SectionTitle title="Morfología" />
              <div className="row">
                <MorphologyItem 
                  title="Sombrero" 
                  description={mushroomData.morphology.cap.description} 
                  image={radicante} 
                />
                <MorphologyItem 
                  title="Pie" 
                  description={mushroomData.morphology.stem.description} 
                  image={mushroomData.morphology.stem.image} 
                />
                <MorphologyItem 
                  title="Láminas" 
                  description={mushroomData.morphology.gills.description} 
                  image={mushroomData.morphology.gills.image} 
                />
              </div>

              <SectionTitle title="Hábitat y Distribución" />
              <p>{mushroomData.habitat}</p>

              <SectionTitle title="Datos Curiosos" />
              <ul>
                {mushroomData.funFacts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}