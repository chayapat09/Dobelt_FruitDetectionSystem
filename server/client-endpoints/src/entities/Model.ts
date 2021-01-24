export interface IModel {
    id : string ;
    model_name : string ;
    fruit_name : string ;
}

class Model implements IModel {

    public id : string ;
    public model_name : string ;
    public fruit_name : string ;

    constructor(model_name : string , fruit_name : string , id? : string  ) {

        this.id = id || '';
        this.model_name = model_name;
        this.fruit_name = fruit_name;

    }

}
