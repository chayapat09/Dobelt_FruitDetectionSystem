import { ISetModel } from "./setModel.type";


function setModel(model : ISetModel , ackCallback : any) {
    const model_id = model.model_id;

    // do sth here //
    ackCallback({ok : true});
}

export default setModel;