import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import selectedIDSlice from './selectedIDSlice';
import pageSlice from './pageSlice';
import filterSlice from './filterSlice';
import currentLogModelNameSlice from './currentLogModelNameSlice';
import currentLogFruitNameSlice from './currentLogFruitNameSlice';
import logTableSlice from './logTableSlice';
import galleryDataSlice from './galleryDataSlice';

const persistConfig = {
    key: 'root',
    storage,
    //Whitelist for saving in persistance storage
    whitelist: ['selectedID', 'page', 'filter', 'currentLogModelName', 'currentLogFruitName', 'logTable', 'galleryData']
}

const rootReducer = combineReducers({
    selectedID: selectedIDSlice,
    page: pageSlice, 
    filter: filterSlice,
    currentLogModelName: currentLogModelNameSlice,
    currentLogFruitName: currentLogFruitNameSlice,
    logTable: logTableSlice,
    galleryData: galleryDataSlice
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
