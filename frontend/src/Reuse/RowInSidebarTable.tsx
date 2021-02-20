import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from '../Redux/selectedIDSlice';
import { RootState } from '../Redux/store';
import filter from '../Components/Logging';
import { getLogTableAPI } from '../API/GetLogTable';

function RowInSidebarTable(props: any) {

  // const todos = useSelector((state) => state.selectedID);
  // const { selectedID } = useSelector((state) => state.selectedID );
  const selected: string = useSelector((state: RootState) => state.selectedID );

  const dispatch = useDispatch();

  const selectedColor:string = '#eff0f1';
  const defaultColor:string = 'white';
  const showColor: string = ( props._id === selected ? selectedColor : defaultColor); 
  const textWeight: any = ( props._id === selected ? "bold" : "normal");

  const mockupFunction = () => console.log('This message is from mockupFunction!');
  // const setModelID = () => {
  //   const dispatch = useDispatch();
  //   return dispatch(edit(props._id));
  // }

  const handleSidebarListener = () => {
    dispatch(edit(props._id));
    getLogTableAPI(props.setLogTable,
                   props.setCurrentLogModelName,
                   props.setCurrentLogFruitName,
                   props._id,
                   props.filter);
  }

  return (
    <tr>
        <td style={{
            border: 'none',
            textAlign: 'center',
            backgroundColor: showColor,
            fontWeight: textWeight
        }}>
            {/* {props.model_name} */}
            {/* <a href='http://localhost:3000/Logging' onClick={() => dispatch(edit(props._id))}>{props.model_name}</a> */}
            <p onClick={handleSidebarListener}>{props.model_name}</p>
        </td>
    </tr>        
  );
}

export default RowInSidebarTable;
