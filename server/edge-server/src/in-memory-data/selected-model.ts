class ModelSelection {
    private selectedModelId : string | null;

    constructor(defaultModel : string | null) {
        this.selectedModelId = defaultModel;
    }

    public setModel(model_id : string | null) {
        this.selectedModelId = model_id;
    }

    public getSelectedModel() {
        return this.selectedModelId;
    }
}

export default new ModelSelection(null);

// On start server
// 1.fetch for model
// 2.saved model to files
// 3.update selected-model
// 4.if model not selected fetch until has model

// or on model update 
// cloud invoke edge server to fetch new model