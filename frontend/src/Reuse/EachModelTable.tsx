import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { IModel, Model } from '../TSEntity/Model';
import axios from '../Axios/configAxios'
// import { useHistory } from 'react-router-dom'; 

// type ModelProps = {
//     _id: string,
//     model_name: string,
//     fruit_name: string,
//     addDate: string,
//     addedBy: string,
//     description: string
// }

const EachModelTable = (props: any) => {

  const [show, setShow] = useState(false);
  const [editedModelName, setEditedModelName] = useState(props.model_name);
  const [editedTypeOfFruit, setEditedTypeOfFruit] = useState(props.fruit_name);
  const [editedAddedBy, setEditedAddedBy] = useState(props.addedBy);
  const [editedModelDescription, setEditedModelDescription] = useState(props.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectAndDeleteObj: Model = new Model('' ,'' ,'' ,null ,'' , props._id);

  const reRender = () => {
    var dummyVar: number = props.reRenderByDummy[0];
    props.reRenderByDummy[1](dummyVar+1);
  }

  const deleteModel = () => {
    console.log('delete' + props._id);
    axios.delete('model', {
      data: selectAndDeleteObj
    })
    .then(res =>{
      console.log(res.data);
      reRender();
    })
    .catch(err =>{
      console.log(err);
    }); 
  }

  const updateModel = () => {
    console.log('update' + props._id);
    axios.post('model/select', selectAndDeleteObj)
    .then(res =>{
      console.log(res.data);
      reRender();
    })
    .catch(err =>{
      console.log(err);
    }); 
  }

  // const checkEditedField = (newVal: string, oldVal: string) : string => {
  //   return newVal==="" ? oldVal : newVal;
  // }

  const editModel = () => {;
    const editedModel: Model = new Model(
      editedModelName,
      editedTypeOfFruit,
      editedAddedBy,
      null,
      editedModelDescription,
      props._id
    )

    console.log(editedModelDescription, props.description);
    console.log(editModel);
    axios.put('model', editedModel)
    .then(res =>{
      console.log(res.data);
      handleClose();
      reRender();
    })
    .catch(err =>{
      console.log(err);
    }); 

  }

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
                <Button variant="primary" style={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginRight: 5, 
                }} onClick={handleShow} >Edit</Button>
                <Button variant="danger" style={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginRight: 5, 
                }} onClick={deleteModel} >delete</Button>
                { props.selected ? 
                <Button variant="warning" style={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginLeft: 1
                }} onClick={updateModel}>select</Button>
                :
                <Button variant="outline-warning" style={{
                  marginTop: 2,
                  marginBottom: 2,
                  marginLeft: 1
                }} onClick={updateModel}>select</Button>
                }
                {' '}
              </div>
            </td>

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
                Edit model
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {/* Form Control */}
              <Form>

                <Form.Group controlId="formModelName">
                  <Form.Label>model name</Form.Label>
                  <Form.Control type="text" value={editedModelName} onChange={(e)=>setEditedModelName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formTypeOfFruit">
                  <Form.Label>Type of fruit</Form.Label>
                  <Form.Control type="text" value={editedTypeOfFruit} onChange={(e)=>setEditedTypeOfFruit(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formAddedBy">
                  <Form.Label>Added by</Form.Label>
                  <Form.Control type="text" value={editedAddedBy} onChange={(e)=>setEditedAddedBy(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlModelDescription">
                  <Form.Label>Model Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={editedModelDescription} onChange={(e)=>setEditedModelDescription(e.target.value)}/>
                </Form.Group>

              </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={editModel}>Submit</Button>
              </Modal.Footer>
              </Modal>
        </tr>

        //Modal tag

    
  );
}

export default EachModelTable;
