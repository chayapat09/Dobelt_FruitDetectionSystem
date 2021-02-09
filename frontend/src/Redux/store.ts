import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import selectedIDSlice from './selectedIDSlice';
import pageSlice from './pageSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['selectedID']
}

const rootReducer = combineReducers({
    selectedID: selectedIDSlice,
    page: pageSlice 
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// export { store, persistor };

// const store = configureStore({
//     reducer
// });
