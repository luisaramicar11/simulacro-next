import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import { createWrapper } from 'next-redux-wrapper';
import { IProduct } from '../../types/productInterface';

// Interfaz del estado del carrito
interface CartState {
  items: IProduct[];
  totalQuantity: number;
  totalPrice: number;
}

// Configuración de la persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'], // Solo persistimos los items del carrito
};

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, cartReducer);

// Función para crear la store
export const createStore = () =>
  configureStore({
    reducer: {
      cart: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Desactivar serializableCheck para evitar advertencias
      }),
  });

// Tipos para TypeScript
export type AppStore = ReturnType<typeof createStore>; // Tipo para la tienda
export type RootState = ReturnType<AppStore['getState']>; // Tipo para el estado global
export type AppDispatch = AppStore['dispatch']; // Tipo para el dispatch

// Creación del wrapper para Next.js
export const wrapper = createWrapper<AppStore>(createStore);

// Creación de la store y persistor
export const store = createStore(); // Ahora es una instancia de la tienda
export const persistor = persistStore(store);
