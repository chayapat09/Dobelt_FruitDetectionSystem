import {IModel} from './type_model'

export interface ISummary {
    //model_id : string ;
    detected : number ;// int
    defected : number ;// int
    normal : number ; // int

}

class Summary implements ISummary,IModel {
    static socketIO_topic = 'predictionSummary'
    
    public model_id : string;

    public detected : number ;
    public defected : number ;
    public normal : number ;

    constructor(model_id : string , detected : number , defected : number , normal : number) {
        this.model_id = model_id

        this.detected = detected;
        this.defected = defected;
        this.normal   = normal;

    }
}

export default Summary;

// Server -> Client via Socket.IO