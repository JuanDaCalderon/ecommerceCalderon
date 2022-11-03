import React from 'react'
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetail';
import { useSelector } from 'react-redux';
import { NavBar, Footer } from '../components';
import { Routes, Route } from 'react-router-dom';



const AppWrapper = () => {

    const productsState = useSelector(state => state.tienda);
    console.log("🚀 ~ file: index.js ~ line 13 ~ AppWrapper ~ productsState", productsState)


    return (
        <>
            <NavBar
                settings={['Perfil', 'Logout']}
                categories={productsState.categories}
            />
            <Routes>
                <Route exact path="/" element={<ItemListContainer productos={productsState.products} />} />
                <Route exact path="/category/:id" element={<ItemListContainer productos={productsState.products} />} />
                <Route exact path="/item/:id" element={<ItemDetailContainer />} />
            </Routes>
            <Footer />
        </>
    )
}

export default AppWrapper