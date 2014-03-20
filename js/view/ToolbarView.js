var ToolbarView = function(view, audioModel, model){
    this.audioModel = audioModel;
    this.model = model;
    this.instrNameList = this.audioModel.getInstrNameList();

    this.load();
}

ToolbarView.prototype.load = function(){    
    var view = this;
    this.selInstr = 1;
    this.model.setInstrNr(this.selInstr);
    view.guitar = true;
    view.glockenspiel = false;
    view.piano = false;
    view.drum = false;
    view.gui = new dat.GUI();
}
