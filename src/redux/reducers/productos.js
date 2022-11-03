import { createSlice } from "@reduxjs/toolkit";
import { randProduct, randProductCategory } from '@ngneat/falso';
import { getImages } from "../../api/request";

const categoriesFilter = randProductCategory({ length: 4 }).filter((category, index, array) => {
    return array.indexOf(category) === index;
});

const productsFilter = randProduct({ length: 30 }).map((product, index) => {
    product.category = categoriesFilter[Math.floor(Math.random() * categoriesFilter.length)];
    return {
        ...product,
        quantity: Math.floor(Math.random() * 100),
        imageId: index + 1,
    };
});
let imagesArray;
const imagesArrayFunc = async () => {
    imagesArray = await getImages();
};
imagesArrayFunc();

export const tiendaObject = createSlice({
    name: "tiendaObject",
    initialState: { products: productsFilter, categories: categoriesFilter, images: imagesArray },
    reducers: {},
});

export default tiendaObject.reducer;