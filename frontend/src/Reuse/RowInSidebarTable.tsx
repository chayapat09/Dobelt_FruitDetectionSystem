import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function RowInSidebarTable(props: any) {

  const { selectedID } = useSelector((state) => state.selectedID );

  const selectedColor:string = '#eff0f1';
  const defaultColor:string = 'white';
  const showColor: string = ( props._id == selectedID ? selectedColor : defaultColor); 

  const mockupFunction = () => console.log('This message is from mockupFunction!');

  return (
    <tr>
        <td style={{
            border: 'none',
            textAlign: 'center',
            backgroundColor: showColor
        }}>
            {/* {props.model_name} */}
            <a href='http://localhost:3000/Logging' onClick={mockupFunction}>{props.model_name}</a>
        </td>
    </tr>        
  );
}

export default RowInSidebarTable;
