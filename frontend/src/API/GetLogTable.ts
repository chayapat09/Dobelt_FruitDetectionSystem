import axios from '../Axios/configAxios';

const getLogTableAPI = (setLogTable: Function, setCurrentLogModelName: Function, setCurrentLogFruitName: Function, 
    model_id: string, filter: number) => {

    var logTableAPI: string = 'log?model_id=' + model_id + '&filter=' + `${filter}`;
    // console.log('request to ' + logTableAPI);
    axios.get(logTableAPI).
    then(res =>{
        console.log(res.data);
        setCurrentLogModelName(res.data.model_name);
        setCurrentLogFruitName(res.data.fruit_name);
        setLogTable(res.data.queryResult);
    }).
    catch(err =>{
      console.log(err);
    });
  }

export {getLogTableAPI};