export const getTypeHeads = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/typeHead`);
    const data = await response.json();
    return data;
}

export const createTypeHead = async (typeHead) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/typeHead`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeHead),
    });
    const data = await response.json();
    return data;
}


export const updateTypeHead = async (id, typeHead) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/typeHead/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeHead),
    });
    const data = await response.json();

    return data;
}

export const deleteTypeHeadById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/typeHead/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}   