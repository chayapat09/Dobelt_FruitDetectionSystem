import React from 'react';
import { Button } from 'react-bootstrap';
//import {Model} from '../TSEntity/Model';

type ModelProps = {
    _id: string,
    model_name: string,
    fruit_name: string,
    addDate: string,
    addedBy: string,
    description: string
}

const EachModelTable = ({ _id, model_name, fruit_name, addDate, addedBy, description}: ModelProps) => {
  return (    
        // <h6>Demo model</h6>
        <tr>
            <td>{model_name}</td>
            <td>{fruit_name}</td>
            <td>{addDate}</td>
            <td>{addedBy}</td>
            <td>{description}</td>
            <td>
              <div style={{
                 display: 'block',
                 margin: 'auto'
              }}>
                <Button variant="danger" style={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginRight: 5, 
                }}>delete</Button>
                <Button variant="warning" style={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginLeft: 1
                }}>select</Button>{' '}
              </div>
            </td>
        </tr>
    
  );
}

export default EachModelTable;
