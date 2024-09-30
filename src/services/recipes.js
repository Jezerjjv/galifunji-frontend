export const getRecipes = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/recipes`);
    const data = await response.json();
    return data;
}

export const getRecipeById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/recipes/${id}`);
    const data = await response.json();
    return data;
}

export const createRecipe = async (recipe) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });
    const data = await response.json();
    return data;
}

export const updateRecipe = async (id, recipe) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });
    const data = await response.json();
    return data;
}

export const deleteRecipe = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/recipes/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}


