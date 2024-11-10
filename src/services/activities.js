export const getActivities = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}api/activities`);
    const data = await response.json();
    return data;
};  

export const createActivity = async (activity) => {
    await fetch(`${process.env.REACT_APP_API}api/activities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
    });
};


export const deleteActivity = async (id) => {
    await fetch(`${process.env.REACT_APP_API}api/activities/${id}`, {
        method: 'DELETE',
    });
};


export const updateActivity = async (id, activity) => {
    await fetch(`${process.env.REACT_APP_API}api/activities/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
    });
};


