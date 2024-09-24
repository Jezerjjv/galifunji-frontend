export const getHabitats = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/habitat`);
    const data = await response.json();
    return data;
}

export const createHabitat = async (habitat) => {

    await fetch(`${process.env.REACT_APP_API}api/habitat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitat),
    });

}

export const updateHabitat = async (id, habitat) => {
    await fetch(`${process.env.REACT_APP_API}api/habitat/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitat),
    });

}


export const deleteHabitatById = async (id) => {
    try {   
        await fetch(`${process.env.REACT_APP_API}api/habitat/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log("entre");
        console.error("Error al eliminar el hábitat");
    }
}