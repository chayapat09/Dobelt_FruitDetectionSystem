export interface IModel {
    id : string ;
    model_name : string ;
    fruit_name : string ;
    dateTime: string;
    addedBy: string;
    description: string;
}

class Model implements IModel {

    public id : string ;
    public model_name : string ;
    public fruit_name : string ;
    public dateTime : string ;
    public addedBy : string ;
    public description : string ;

    constructor(model_name : string ,
                fruit_name : string ,
                dateTime : string ,
                addedBy : string ,
                description : string ,
                 id? : string  ) {

        this.id = id || '';
        this.model_name  = model_name;
        this.fruit_name  = fruit_name;
        this.dateTime    = dateTime;
        this.addedBy     = addedBy;
        this.description = description;

    }

}

export { Model };
