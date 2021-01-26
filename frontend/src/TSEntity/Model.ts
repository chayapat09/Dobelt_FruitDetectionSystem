export interface IModel {
    _id : string ;
    model_name : string ;
    fruit_name : string ;
    addDate: Date | null;
    addedBy: string;
    description: string;
}

class Model implements IModel {

    public _id : string ;
    public model_name : string ;
    public fruit_name : string ;
    public addDate : Date | null ;
    public addedBy : string ;
    public description : string ;

    constructor(model_name : string ,
                fruit_name : string ,
                addedBy : string ,
                addDate : Date | null ,
                description : string ,
                 _id? : string  ) {

        this._id = _id || '';
        this.model_name  = model_name;
        this.fruit_name  = fruit_name;
        this.addDate    = addDate;
        this.addedBy     = addedBy;
        this.description = description;

    }

}

export { Model };
