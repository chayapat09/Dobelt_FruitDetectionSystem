import { IValidable } from "./interface/validable";

export interface IGallery {
    _id : string ; 
    log_id : string ;
    thumbnailUrl : string ;
    fullUrl : string ; 
}

export class Gallery implements IGallery,IValidable {

    public _id : string ;
    public log_id : string ;
    public thumbnailUrl : string ;
    public fullUrl : string ; 

    constructor(log_id : string , thumbnailUrl : string , fullUrl : string , _id? : string ) {
        this._id = _id || '';
        this.log_id = log_id;
        this.thumbnailUrl = thumbnailUrl;
        this.fullUrl = fullUrl;
        this.validate();
    }

    public validate() {
        // if (typeof this.result !== 'number' || !(this.result === Log.RESULT_NORMAL || this.result === Log.RESULT_DEFECTED) ) {
        //     throw Error('Log Field Validation Error');
        // }
    }

}


// to query thumbnail frontend 
// 1. full static url
// 2. seperate api /gallery/full/:id and /gallery/thumbnail/:id -> need to query one more times from db ??