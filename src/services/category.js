export const getCategories = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/categories`);
    const data = await response.json();
    return data;
};

export const getCategoryById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/categories/${id}`);
    const data = await response.json();
    return data;
};


export const createCategory = async (category) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
}
    

export const updateCategory = async (id, category) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
}

export const deleteCategoryById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/categories/${id}`, {
        method: 'DELETE'
    });
}   
