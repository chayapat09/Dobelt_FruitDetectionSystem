import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import EachModelTable from '../Reuse/EachModelTable';
import { Model } from '../TSEntity/Model';
//import styles from './ModelManipuation.module.scss';

//Validation Table
const ObjA: Model = new Model('Apple1', 'apple', '20/1/2021', 'Bob', 'Our first model', '1');

function ModelManiputlation() {

  const postNewModelEndpoints = '168';

  const [show, setShow] = useState(false);
  const [modelName, setModelName] = useState("");
  const [typeOfFruit, setTypeOfFruit] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postNewModel = () => {
    console.log(modelName, typeOfFruit, addedBy, modelDescription);
  }

  return (
    <Container fluid>
      <Row>
          <Col>
            <h1>Model Manipulation!</h1>
          </Col>
          <Col>
            {/* <h6>{ObjA.description}</h6> */}
            <Button variant="outline-success" onClick={handleShow} 
            style={{
              float: 'right',
              marginTop: 20,
              marginBottom: 20,
              marginRight: 10
            }}>Add new model</Button>{' '}
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

      {/* Modal tag */}
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          New model
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div>
          <h5>unknown model</h5>
        </div> */}

        {/* Form Control */}
        <Form>

          <Form.Group controlId="formModelName">
            <Form.Label>model name</Form.Label>
            <Form.Control type="text" onChange={(e)=>setModelName(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formTypeOfFruit">
            <Form.Label>Type of fruit</Form.Label>
            <Form.Control type="text" onChange={(e)=>setTypeOfFruit(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formAddedBy">
            <Form.Label>Added by</Form.Label>
            <Form.Control type="text" onChange={(e)=>setAddedBy(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlModelDescription">
            <Form.Label>Model Description</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e)=>setModelDescription(e.target.value)}/>
          </Form.Group>

        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={postNewModel}>Submit</Button>
      </Modal.Footer>
      </Modal>

    </Container>    
  );
}

export default ModelManiputlation;
