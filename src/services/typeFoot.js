export const getTypeFoots = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/typeFoot`);
    const data = await response.json();
    return data;
};

export const createTypeFoot = async (typeFoot) => {

    const response = await fetch(`${process.env.REACT_APP_API}api/typeFoot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(typeFoot)
    });
    const data = await response.json();
    return data;
};


export const updateTypeFoot = async (id, typeFoot) => {

    const response = await fetch(`${process.env.REACT_APP_API}api/typeFoot/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(typeFoot)
    });
    const data = await response.json();
    return data;
};

export const deleteTypeFootById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/typeFoot/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
};