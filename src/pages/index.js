import React, { useContext } from 'react'
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetail';
import Login from './login';
import Registro from './registro';
import CartPage from './cart';
import CheckOutPage from './checkout.js';
import { ecommerceContext } from '../context/context';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout, LoginLayout } from '../layouts';



const AppWrapper = () => {
    const productsState = useContext(ecommerceContext);

    return (
        <>
            <Routes>
                <Route exact path="/" element={
                    <DefaultLayout categories={productsState.categories}>
                        <ItemListContainer productos={productsState.products} />
                    </DefaultLayout>
                } />
                <Route exact path="/login" element={
                    <LoginLayout>
                        <Login />
                    </LoginLayout>
                } />
                <Route exact path="/registro" element={
                    <LoginLayout>
                        <Registro />
                    </LoginLayout>
                } />
                <Route exact path="/cart" element={
                    <DefaultLayout categories={productsState.categories}>
                        <CartPage />
                    </DefaultLayout>
                } />
                <Route exact path="/checkout" element={
                    <DefaultLayout categories={productsState.categories}>
                        <CheckOutPage />
                    </DefaultLayout>
                } />
                <Route exact path="/category/:id" element={
                    <DefaultLayout categories={productsState.categories}>
                        <ItemListContainer productos={productsState.products} />
                    </DefaultLayout>
                } />
                <Route exact path="/item/:id" element={
                    <DefaultLayout categories={productsState.categories}>
                        <ItemDetailContainer />
                    </DefaultLayout>
                } />
            </Routes>
        </>
    )
}

export default AppWrapper