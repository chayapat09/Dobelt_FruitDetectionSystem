export interface IGalleryQueryResult {
    _id : IGallery['_id'];
    log_id : IGallery['log_id'];
    thumbnailUrl : IGallery['thumbnailUrl'];
    fullUrl : IGallery['fullUrl'];
    logDocument : ILog;
}


import { IGallery } from "@entities/Gallery";
// import { query_filter } from "@shared/enum";
import { query_filter } from "../../shared/enum";
import { ILog } from "./type_logging";
import { IModel, IModelDetail } from "./type_model";

export interface IGalleries {
    queryResult : IGalleryQueryResult[];
}

// export interface ILog {
//     //name : string ;
//     timestamp : string | Date ; // it will automatically converted
//     result : number ;
// }


// filter params

const NO_FILTER = query_filter.NO_FILTER; // 0 
const NORMAL_ONLY = query_filter.NORMAL_ONLY; // 1
const DEFECTED_ONLY = query_filter.DEFECTED_ONLY; // 2

export interface IGalleryQueryParam {
    model_id : string ; 
    filter : number ;
}

export class GalleryQueryResult implements IGalleries,IModel,IModelDetail {
    static RESULT_DEFECTED = 1;
    static RESULT_NORMAL = 0;
    static apiEndPoint = '/api/gallery'

    public model_id : string;

    public model_name : string;
    public fruit_name : string;

    public queryResult : IGalleryQueryResult[];
    
    constructor(model_id :string , model_name :string , fruit_name :string, queryResult : IGalleryQueryResult[] ) {
        this.model_id = model_id;
        this.model_name = model_name;
        this.fruit_name = fruit_name;
        this.queryResult = queryResult;
    }
}