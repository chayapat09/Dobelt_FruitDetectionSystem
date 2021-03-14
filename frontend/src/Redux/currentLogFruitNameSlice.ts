import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialValue: string = "";

const currentLogFruitNameSlice = createSlice({
    name: 'currentLogFruitName',
    initialState: initialValue,
    reducers: {
        editCurrentLogFruitName: (state, {payload}: PayloadAction<string> ) => state = payload
    }
});

export const { editCurrentLogFruitName } = currentLogFruitNameSlice.actions

export default currentLogFruitNameSlice.reducer