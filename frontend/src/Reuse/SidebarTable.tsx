import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { Model } from '../TSEntity/Model';
import RowInSidebarTable from './RowInSidebarTable';

function SidebarTable(props: any) {

  const sidebarModelList: Model[] = props.sidebarModelList;

  return (
    <div style={{
  
    }}>
      <Table>
        <thead>
          <tr>
            <th style={{
              border: 'none'
            }}>Model</th>
          </tr>
        </thead>
        <tbody>
          {/* <RowInSidebarTable model_name={1} selected={true}/>
          <RowInSidebarTable model_name={2} selected={false}/>
          <RowInSidebarTable model_name={3} selected={false}/>
          <RowInSidebarTable model_name={4} selected={false}/> */}
          {sidebarModelList.map((eachObj) => {
            const {_id, model_name} = eachObj;
              return (
              <RowInSidebarTable model_name={model_name} _id={_id} />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default SidebarTable;
