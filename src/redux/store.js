import { configureStore } from "@reduxjs/toolkit";
import tiendaReducer from "./reducers/productos";

const store = configureStore({
    reducer: {
        tienda: tiendaReducer,
    }
});

export default store;