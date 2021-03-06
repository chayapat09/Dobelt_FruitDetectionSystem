import React from 'react';

function EachLogTable(props: any) {

  const showResult:string = (props.result == 0 ? 'Cat': 'Dog');

  return (
    <tr>
        <td>{props.numberOfFruit + 1}</td>
        <td>{props.timestamp}</td>
        <td>{showResult}</td>
    </tr>
  );
}

export default EachLogTable;
