import { IModel, IModelDetail } from "./type_model";

class ModelObject implements IModel , IModelDetail {
    static modelApi = '/api/model' // List Model -> GET , Add Model POST

    public model_id : string;
    public model_name : string ;
    public fruit_name : string ;

    constructor(model_id : string , model_name : string , fruit_name : string ) {
        this.model_id = model_id;
        this.model_name = model_name;
        this.fruit_name = fruit_name;
    }

}
export default ModelObject;