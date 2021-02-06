import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import SidebarTable from '../Reuse/SidebarTable';

function Logging() {

  let sidebarWidth:number = 1;
  let contentWidth:number = 11;

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={sidebarWidth} sm={sidebarWidth} md={sidebarWidth} lg={sidebarWidth} xl={sidebarWidth} >
            <SidebarTable />
          </Col> 
          <Col xs={contentWidth} sm={contentWidth} md={contentWidth} lg={contentWidth} xl={contentWidth} style={{
            backgroundColor: 'pink'
          }}>
            
          </Col> 
        </Row>
      </Container>
    </div>
  );
}

export default Logging;
