import { IModel, IModelDetail } from "./type_model";

export interface ILogging {
    queryResult : ILog[];
}

export interface ILog {
    //name : string ;
    timestamp : Date ;
    result : number ;
}


// filter params

const NO_FILTER = 0;
const NORMAL_ONLY = 1;
const DEFECTED_ONLY = 2;

export interface ILogQueryParam {
    model_id : string ; 
    filter : number ;
}

class LoggingQueryResult implements ILogging,IModel,IModelDetail {
    static RESULT_DEFECTED = 1;
    static RESULT_NORMAL = 0;
    static apiEndPoint = '/api/log'

    public model_id : string;

    public model_name : string;
    public fruit_name : string;

    public queryResult : ILog[];
    
    constructor(model_id :string , model_name :string , fruit_name :string, queryResult : ILog[] ) {
        this.model_id = model_id;
        this.model_name = model_name;
        this.fruit_name = fruit_name;
        this.queryResult = queryResult;
    }
}
// GET
// fetch('161.200.199.2' + LoggingQueryResult.apiEndPoint + `?filter=${NO_FILTER}&model_id=9w4kwkwprgkwr`).then((value : Response) => {
//     //value.body toJson // ทำไง 
//     const jsonObject : LoggingQueryResult = ...;
    

// })


export default LoggingQueryResult;