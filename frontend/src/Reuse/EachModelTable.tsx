import React from 'react';
import { Button } from 'react-bootstrap';
//import {Model} from '../TSEntity/Model';
import { useHistory } from 'react-router-dom'; 

// type ModelProps = {
//     _id: string,
//     model_name: string,
//     fruit_name: string,
//     addDate: string,
//     addedBy: string,
//     description: string
// }

const EachModelTable = (props: any) => {

  let history = useHistory();

  // history.push("/ModelManiputlation");

  return (    
        // <h6>Demo model</h6>
        <tr>
            <td>{props.model_name}</td>
            <td>{props.fruit_name}</td>
            <td>{props.addDate}</td>
            <td>{props.addedBy}</td>
            <td>{props.description}</td>
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
