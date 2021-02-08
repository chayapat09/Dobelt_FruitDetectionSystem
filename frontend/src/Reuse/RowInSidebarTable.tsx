import React from 'react';
import { Container, Table } from 'react-bootstrap';

function RowInSidebarTable(props: any) {

  const selectedColor:string = '#eff0f1';
  const defaultColor:string = 'white';
  const showColor: string = props.selected ? selectedColor : defaultColor; 

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
