import React from 'react';
import { Container, Table } from 'react-bootstrap';
import RowInSidebarTable from './RowInSidebarTable';

function SidebarTable() {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{
            border: 'none'
          }}>Model</th>
        </tr>
      </thead>
      <tbody>
        <RowInSidebarTable model_name={1} selected={true}/>
        <RowInSidebarTable model_name={2} selected={false}/>
        <RowInSidebarTable model_name={3} selected={false}/>
        <RowInSidebarTable model_name={4} selected={false}/>
      </tbody>
    </Table>
  );
}

export default SidebarTable;
