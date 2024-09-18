
export const addMushroom = async (mushroom) => {
    console.log(mushroom);
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms`, {
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

export const getMushroomById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}`);
    const data = await response.json();
    return data;
}; 

export const setIsMagic = async (id, isMagic) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}/magic`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ magica: isMagic })
    });
}   

export const setIsMedicinal = async (id, isMedicinal) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}/medicinal`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ medicinal: isMedicinal })
    });
}   
export const deleteMushroomById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/${id}`, {
        method: 'DELETE'
    });
}

export const updateMushroom = async (mushroom) => {
    console.log(mushroom);
    const response = await fetch(`${process.env.REACT_APP_API}api/mushrooms/${mushroom.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mushroom)
    });
}   