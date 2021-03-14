import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILog } from '../../../server/client-endpoints/src/type/client-server-type/type_logging';

const initialLogTable: ILog[] = [];

const logTableSlice = createSlice({
    name: 'logTable',
    initialState: initialLogTable,
    reducers: {
        editLogTable: (state, {payload}: PayloadAction<ILog[]> ) => state = payload
    }
});

export const { editLogTable } = logTableSlice.actions

export default logTableSlice.reducer