import React from 'react';
import { Container, Table } from 'react-bootstrap';

function RowInSidebarTable(props: any) {

  const selectedColor:string = '#eff0f1';
  const defaultColor:string = 'white';
  const showColor: string = props.selected ? selectedColor : defaultColor; 

  return (
    <tr>
        <td style={{
            border: 'none',
            textAlign: 'center',
            backgroundColor: showColor
        }}>
            {props.model_name}
        </td>
    </tr>        
  );
}

export default RowInSidebarTable;
