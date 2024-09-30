import React, { useState } from 'react'
import CategoryAdminPanel from './category';
import MushroomsAdminPanel from './mushrooms';
import HabitatAdminPanel from './habitat';
import TypeHeadAdminPanel from './typeHead';
import TypeFootAdminPanel from './typeFoot';
import Recipes from './recipes';
export default function Component() {
    const [currentPage, setCurrentPage] = useState('home')

    const renderContent = () => {
        switch (currentPage) {
            case 'categorias':
                return <CategoryAdminPanel />
            case 'setas':
                return <MushroomsAdminPanel />
            case 'habitat':
                return <HabitatAdminPanel />
            case 'typeHead':
                return <TypeHeadAdminPanel />
            case 'typeFoot':
                return <TypeFootAdminPanel />
            case 'recipes':
                return <Recipes />
            case 'usuarios': return <h1>Working on it, coming soon</h1>
            break;
            default:
                return (
                    <>
                        <h2>Bienvenido al Panel Administrativo</h2>
                        <p>Selecciona una opción para comenzar.</p>
                    </>
                )
        }
    }

    const menuItems = [
        { id: 'home', title: 'Panel Principal', icon: '🏠' },
        { id: 'categorias', title: 'Categorías', icon: '📁' },
        { id: 'setas', title: 'Setas', icon: '🍄' },
        { id: 'habitat', title: 'Habitat', icon: ' 🌳' },
        { id: 'typeHead', title: 'Tipo laminas', icon: ' 🌸' },
        { id: 'typeFoot', title: 'Tipo pie', icon: ' 🦶' },
        { id: 'recipes', title: 'Recipes', icon: '🍽️' },
        { id: 'usuarios', title: 'Usuarios', icon: '👥' },
    ]

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
        }}>
            {/* Sidebar */}
            <nav style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                padding: '20px',
                transition: 'all 0.3s',
            }}>
                <h1 style={{ color: '#ecf0f1', marginBottom: '30px', fontSize: '24px' }}>Admin Panel</h1>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        style={{
                            padding: '10px',
                            marginBottom: '10px',
                            cursor: 'pointer',
                            backgroundColor: currentPage === item.id ? '#34495e' : 'transparent',
                            color: '#ecf0f1',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s',
                        }}
                    >
                        <span style={{ marginRight: '10px', fontSize: '20px' }}>{item.icon}</span>
                        {item.title}
                    </div>
                ))}
            </nav>

            {/* Main content */}
            <main style={{
                flex: 1,
                padding: '20px',
                backgroundColor: '#ecf0f1',
                transition: 'all 0.3s',
            }}>
                <h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>
                    {menuItems.find(item => item.id === currentPage)?.title}
                </h1>
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}