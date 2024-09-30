
export const addMushroom = async (mushroom) => {
    console.log(mushroom);
    await fetch(`${process.env.REACT_APP_API}api/mushrooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mushroom)
    });
}

export const getMushrooms = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms`);
    const data = await response.json();
    return data;
}; 

export const getMushroomsMagic = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/magic`);
    const data = await response.json();
    return data;
}; 

export const getMushroomsMedicinal = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/medicinal`);
    const data = await response.json();
    return data;
}; 
export const getMushroomsAll = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/all`);
    const data = await response.json();
    return data;
}; 

export const getMushroomById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}`);
    const data = await response.json();
    return data;
}; 

export const setIsMagic = async (id, isMagic) => {
    await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}/magic`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ magica: isMagic })
    });
}   

export const setIsMedicinal = async (id, isMedicinal) => {
    await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}/medicinal`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ medicinal: isMedicinal })
    });
}   
export const deleteMushroomById = async (id) => {
    await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}`, {
        method: 'DELETE'
    });
}

export const updateMushroom = async (mushroom) => {
    await fetch(`${process.env.REACT_APP_API}api/mushrooms/${mushroom.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mushroom)
    });
} 
