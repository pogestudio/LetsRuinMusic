var ToolbarView = function(view, audioModel, model){
    this.audioModel = audioModel;
    this.model = model;
    this.instrNameList = this.audioModel.getInstrNameList();

    this.load();
 //   this.posx = 0;
  //  this.posy = 0;
}

ToolbarView.prototype.load = function(){    
    this.guitar = true;
    this.glockenspiel = false;
    this.piano = false;
    this.drum = false;
    this.delay = 300;
    this.posx = this.model.x.toString();
    this.posy = this.model.y.toString();
    this.gui = new dat.GUI();
}
