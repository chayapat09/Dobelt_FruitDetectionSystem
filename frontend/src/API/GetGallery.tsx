import axios from '../Axios/configAxios';
import { useSelector, useDispatch, connect } from 'react-redux';
import { RootState } from '../Redux/store';
import { editCurrentLogModelName } from '../Redux/currentLogModelNameSlice';
import { editCurrentLogFruitName } from '../Redux/currentLogFruitNameSlice';
import { editLogTable } from '../Redux/logTableSlice';
import { forwardRef, useImperativeHandle } from 'react';

const GetLogTable = forwardRef((props: any, ref: any) => {

  //Get states in Redux
  let selectedModelID: string = useSelector((state: RootState) => state.selectedID );
  let filterAPI: number = useSelector((state: RootState) => state.filter );

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({

    getLogTableAPI() {
      console.log('filterAPI = ', filterAPI);
      var logTableAPI: string = 'log?model_id=' + selectedModelID + '&filter=' + `${filterAPI}`;
      console.log('request to ' + logTableAPI);
      axios.get(logTableAPI).
      then(res =>{
          console.log(res.data);
          dispatch(editCurrentLogModelName(res.data.model_name));
          dispatch(editCurrentLogFruitName(res.data.fruit_name));
          dispatch(editLogTable(res.data.queryResult));
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

export default GetLogTable
