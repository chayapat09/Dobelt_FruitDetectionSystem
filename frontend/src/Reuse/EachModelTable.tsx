import React from 'react';
import { Button } from 'react-bootstrap';
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
    axios.post('mode/select', selectAndDeleteObj)
    .then(res =>{
      console.log(res.data);
      reRender();
    })
    .catch(err =>{
      console.log(err);
    }); 
  }

  const editModel = () => {
    // editedModel = new Model()
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
                }} onClick={editModel} >delete</Button>
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
        </tr>
    
  );
}

export default EachModelTable;
