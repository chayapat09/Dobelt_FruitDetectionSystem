import { IValidable } from "./interface/validable";

export interface ILog {
    model_id : string ;
    timestamp : Date ;
    result : number ; 
}

class Log implements ILog,IValidable {
    static RESULT_DEFECTED = 1;
    static RESULT_NORMAL = 0;

    public model_id : string ;
    public timestamp : Date ;
    public result : number ; 

    constructor(model_id : string , timestamp : Date , result : number  ) {

        this.model_id = model_id;
        this.timestamp = timestamp;
        this.result = result;
        this.validate();

    }

    public validate() {
        if (typeof this.result !== 'number' || !(this.result === Log.RESULT_NORMAL || this.result === Log.RESULT_DEFECTED) ) {
            throw Error('Log Field Validation Error');
        }
    }

}

