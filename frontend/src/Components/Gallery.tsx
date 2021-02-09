import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { edit } from '../Redux/pageSlice';

function Gallery() {

    const galleryPageNumber: number = 4;
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(edit(galleryPageNumber));
        console.log('Welcome to our gallery!');
    }, []);
    
    return (
        <div>
            <h1>This page is telling robot state</h1>
        </div>
    );
}

export default Gallery;
