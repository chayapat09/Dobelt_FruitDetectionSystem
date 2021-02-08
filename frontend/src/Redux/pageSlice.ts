import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialPage: number = 1;

const pageSlice = createSlice({
    name: 'page',
    initialState: initialPage,
    reducers: {
        edit: (state, {payload}: PayloadAction<number> ) => state = payload
    }
});

export const { edit } = pageSlice.actions

export default pageSlice.reducer