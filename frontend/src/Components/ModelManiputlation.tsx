import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import EachModelTable from '../Reuse/EachModelTable';
import { Model } from '../TSEntity/Model';
//import styles from './ModelManipuation.module.css';

//Validation Table
const ObjA: Model = new Model('Apple1', 'apple', '20/1/2021', 'Bob', 'Our first model', '1');

function ModelManiputlation() {
  return (
    <Container fluid>
      <Row>
          <Col>
            <h1>Model Manipulation!</h1>
          </Col>
          <Col>
            <h6>{ObjA.description}</h6>
          </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{width: "12.5%"}}>Model name</th>
            <th style={{width: "12.5%"}}>Type of fruit</th>
            <th style={{width: "12.5%"}}>Added by</th>
            <th style={{width: "12.5%"}}>DateTime</th>
            <th style={{width: "50%"}}>Description</th>
          </tr>
        </thead>  
        <tbody>
          <EachModelTable model_name={ObjA.model_name}
                          fruit_name={ObjA.fruit_name}
                          dateTime={ObjA.dateTime}
                          addedBy={ObjA.addedBy}
                          description={ObjA.description}/>
        </tbody>
      </Table>
      {/* EachModelTable  */}
    </Container>    
  );
}

export default ModelManiputlation;
