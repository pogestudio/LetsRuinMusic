var ToolbarView = function(view, audioModel, model){
    this.audioModel = audioModel;
    this.model = model;
    this.instrNameList = this.audioModel.getInstrNameList();

    this.load();
}

ToolbarView.prototype.load = function(){    
    var view = this;
    view.guitar = true;
    view.glockenspiel = false;
    view.piano = false;
    view.drum = false;

    view.delay = 200;

    view.gui = new dat.GUI();
}
