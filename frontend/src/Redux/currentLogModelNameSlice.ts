import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialValue: string = "";

const currentLogModelNameSlice = createSlice({
    name: 'currentLogModelName',
    initialState: initialValue,
    reducers: {
        editCurrentLogModelName: (state, {payload}: PayloadAction<string> ) => state = payload
    }
});

export const { editCurrentLogModelName } = currentLogModelNameSlice.actions

export default currentLogModelNameSlice.reducer