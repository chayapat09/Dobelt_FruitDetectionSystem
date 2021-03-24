import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGalleryQueryResult } from '../../../server/client-endpoints/src/type/client-server-type/type_gallery';

const initialGalleryData: IGalleryQueryResult[] = [];

const galleryDataSlice = createSlice({
    name: 'logTable',
    initialState: initialGalleryData,
    reducers: {
        editGalleryData: (state, {payload}: PayloadAction<IGalleryQueryResult[]> ) => state = payload
    }
});

export const { editGalleryData } = galleryDataSlice.actions

export default galleryDataSlice.reducer