export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('key', process.env.REACT_APP_IMGBB_API_KEY);
        formData.append('image', image);

        const response = await fetch(process.env.REACT_APP_IMGBB_URL, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        return data.data.display_url;
    } catch (error) {
        console.error(error);
        return null;
    }
}