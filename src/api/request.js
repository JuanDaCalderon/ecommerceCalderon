export const getImages = async () => {
    const response = await fetch('https://63630aa537f2167d6f7116d3.mockapi.io/ecommerce/images');
    const data = await response.json();
    return data;
};