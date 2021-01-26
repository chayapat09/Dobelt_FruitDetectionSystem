import {IModel} from '@entities/Model';

export interface IModelManage {
    modelDatas : IModel[];
    selectedModel : string | null ;
}
class ModelManageObject {
    static modelApi = '/api/model' // List Model -> GET , Add Model POST

    public modelDatas : IModel[] ;
    public selectedModel : string | null ;

    constructor( model : IModel[] , selectedModel : string ) {
        this.modelDatas = model;
        this.selectedModel = selectedModel;
    }
}

export default ModelManageObject;
