import React, { useState, createContext, useEffect } from 'react'
import { randProduct, randProductCategory } from '@ngneat/falso';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
export const ecommerceContext = createContext();
const { Provider } = ecommerceContext;

const categoriesFilter = randProductCategory({ length: 4 }).filter((category, index, array) => {
    return array.indexOf(category) === index;
});

const productsFilter = randProduct({ length: 30 }).map((product) => {
    product.category = categoriesFilter[Math.floor(Math.random() * categoriesFilter.length)];
    delete product.rating;
    return {
        ...product,
        quantity: Math.floor(Math.random() * 100)
    };
});

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({
        products: [],
    });

    useEffect(() => {
        getProducts()
        getCategories()
    }, []);

    const getProducts = async () => {
        const productsArrayFromDB = [];
        const querySnapshot = await getDocs(collection(db, "products"));
        if (querySnapshot.docs.length <= 0) {
            for (const product of productsFilter) {
                await addDoc(collection(db, "products"), product);
                productsArrayFromDB.push(product);
            }
            setProducts(productsArrayFromDB);
        }
        else {
            querySnapshot.forEach((doc) => {
                productsArrayFromDB.push({ ...doc.data() });
            });
            setProducts(productsArrayFromDB);
        }
    };

    const getCategories = async () => {
        const categoriesArrayFromDB = [];
        const querySnapshot = await getDocs(collection(db, "categories"));
        if (querySnapshot.docs.length <= 0) {
            for (const categorie of categoriesFilter) {
                await addDoc(collection(db, "categories"), { categorie });
                categoriesArrayFromDB.push(categorie);
            }
            setCategories(categoriesArrayFromDB);
        }
        else {
            querySnapshot.forEach((doc) => {
                categoriesArrayFromDB.push(doc.data().categorie);
            });
            setCategories(categoriesArrayFromDB);
        }
    };

    const contextState = {
        user,
        setUser,
        products,
        setProducts,
        categories,
        cart,
        setCart
    };
    return (
        <Provider value={contextState}>
            {children}
        </Provider>
    )
}

export default ContextProvider