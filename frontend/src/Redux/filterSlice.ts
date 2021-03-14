import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialFilter: number = 0;

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilter,
    reducers: {
        editFilter: (state, {payload}: PayloadAction<number> ) => state = payload
    }
});

export const { editFilter } = filterSlice.actions

export default filterSlice.reducer