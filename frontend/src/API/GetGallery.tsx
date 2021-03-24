import axios from '../Axios/configAxios';
import { useSelector, useDispatch, connect } from 'react-redux';
import { RootState } from '../Redux/store';
import { editCurrentLogModelName } from '../Redux/currentLogModelNameSlice';
import { editCurrentLogFruitName } from '../Redux/currentLogFruitNameSlice';
import { editGalleryData } from '../Redux/galleryDataSlice';
import { forwardRef, useImperativeHandle } from 'react';

const GetGalleryData = forwardRef((props: any, ref: any) => {

  //Get states in Redux
  let selectedModelID: string = useSelector((state: RootState) => state.selectedID );
  let filterAPI: number = useSelector((state: RootState) => state.filter );

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({

    getGalleryDataAPI() {
      console.log('filterAPI = ', filterAPI);
      var galleryDataAPI: string = 'gallery?model_id=' + selectedModelID + '&filter=' + `${filterAPI}`;
      console.log('request to ' + galleryDataAPI);
      axios.get(galleryDataAPI).
      then(res =>{
          console.log(res.data);
          dispatch(editCurrentLogModelName(res.data.model_name));
          dispatch(editCurrentLogFruitName(res.data.fruit_name));
          dispatch(editGalleryData(res.data.queryResult));
      }).
      catch(err =>{
        console.log(err);
      });
    }

  }));

  return (
    <div />
  );
})

export default GetGalleryData
