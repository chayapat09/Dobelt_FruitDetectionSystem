import React from 'react';
//import {Model} from '../TSEntity/Model';

type ModelProps = {
    model_name: string,
    fruit_name: string,
    dateTime: string,
    addedBy: string,
    description: string
}

const EachModelTable = ({model_name, fruit_name, dateTime, addedBy, description}: ModelProps) => {
  return (    
        // <h6>Demo model</h6>
        <tr>
            <td>{model_name}</td>
            <td>{fruit_name}</td>
            <td>{dateTime}</td>
            <td>{addedBy}</td>
            <td>{description}</td>
        </tr>
    
  );
}

export default EachModelTable;
