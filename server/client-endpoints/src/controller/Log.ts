import logDao, { ILogQuery } from "@daos/Log/Log"
import modelDao from "@daos/Model/Model";
import { ILog } from "@entities/Log";
import { IModel } from "@entities/Model";
import {LoggingQueryResult} from "src/type/client-server-type/type_logging";

export const getLog = async (filter : number , model_id : string ) : Promise<LoggingQueryResult> => {
    const query : ILogQuery = {
        model_id : model_id , 
        filter : filter 
    };

    const queryRes : ILog[] = await logDao.query(query);
    const modelDetail : IModel | null = await modelDao.getOne(query.model_id);

    if (modelDetail === null) {
        throw new Error('Model Not Found!');
    }
    if (modelDetail._id === null) {
        throw new Error('Model.id is null');
    }

    return new LoggingQueryResult(
        modelDetail._id , 
        modelDetail.model_name , 
        modelDetail.fruit_name , 
        queryRes
    );


}