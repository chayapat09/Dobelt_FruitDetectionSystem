// Global for every Clients
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