import { IModel, Model } from '../TSEntity/Model';
import axios from '../Axios/configAxios';

const getModelAPI = (setModelFunction: Function) => {
    axios.get('model').
    then(res =>{
      console.log(res.data);
      setModelFunction(res.data.modelDatas);
    //   output = res.data.modelDatas.map((eachObj: any)=>{
    //   const dummyModel:Model = new Model(eachObj.model_name, eachObj.fruit_name, eachObj.addedBy, 
    //                                eachObj.addDate, eachObj.description, eachObj._id);
    //       return dummyModel;
    //   });
    //   const 
    }).
    catch(err =>{
      console.log(err);
    });
  }

export {getModelAPI};