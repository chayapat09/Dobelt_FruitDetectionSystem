import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import EachModelTable from '../Reuse/EachModelTable';
import { IModel, Model } from '../TSEntity/Model';
//import styles from './ModelManipuation.module.scss';

let dataTable: Model[] = [];

//Validation Table
const x = new Date()
const ObjA: Model = new Model('Apple1', 'apple','Alice' ,x , 'Our first model', '1');
const ObjB: Model = new Model('Orange1', 'orange','Bob' ,x , 'Our second model', '2');
// dataTable.push(ObjA);
// dataTable.push(ObjB);



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
            <th style={{width: "40%"}}>Description</th>
            <th style={{width: "10%"}}>Action</th>
          </tr>
        </thead>  
        <tbody>
          <EachModelTable _id = {ObjA._id}
                          model_name={ObjA.model_name}
                          fruit_name={ObjA.fruit_name}
                          addDate={ObjA.addDate === null ? "" : ObjA.addDate.toDateString()}
                          addedBy={ObjA.addedBy}
                          description={ObjA.description}/>

          {dataTable.map((eachObj) => {
            const {model_name, fruit_name, addDate, addedBy, description} = eachObj;
            return (<EachModelTable 
                    _id = {eachObj._id}
                    model_name={eachObj.model_name}
                    fruit_name={eachObj.fruit_name}
                    addDate={eachObj.addDate === null ? "" : eachObj.addDate.toDateString()}
                    addedBy={eachObj.addedBy}
                    description={eachObj.description}/>
            );}
          )}

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
