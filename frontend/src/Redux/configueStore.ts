import { configureStore, combineReducers } from '@reduxjs/toolkit';
import selectedIDSlice from './selectedIDSlice';
import pageSlice from './pageSlice';

const rootReducer = combineReducers({
    selectedID: selectedIDSlice,
    page: pageSlice 
});

export type RootState = ReturnType<typeof rootReducer>

// const store = configureStore({
//     reducer
// });
