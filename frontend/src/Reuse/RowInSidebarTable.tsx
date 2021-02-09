import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from '../Redux/selectedIDSlice';
import { RootState } from '../Redux/store';

function RowInSidebarTable(props: any) {

  // const todos = useSelector((state) => state.selectedID);
  // const { selectedID } = useSelector((state) => state.selectedID );
  const selected: string = useSelector((state: RootState) => state.selectedID );

  const dispatch = useDispatch();

  const selectedColor:string = '#eff0f1';
  const defaultColor:string = 'white';
  const showColor: string = ( props._id === selected ? selectedColor : defaultColor); 

  const mockupFunction = () => console.log('This message is from mockupFunction!');
  // const setModelID = () => {
  //   const dispatch = useDispatch();
  //   return dispatch(edit(props._id));
  // }

  return (
    <tr>
        <td style={{
            border: 'none',
            textAlign: 'center',
            backgroundColor: showColor
        }}>
            {/* {props.model_name} */}
            <a href='http://localhost:3000/Logging' onClick={() => dispatch(edit(props._id))}>{props.model_name}</a>
            {/* <div>
              <h6 onClick={() => dispatch(edit(props._id))}>{selected}</h6>
              <h6>{props._id}</h6>
            </div> */}
        </td>
    </tr>        
  );
}

export default RowInSidebarTable;
