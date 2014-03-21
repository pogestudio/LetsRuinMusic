var ToolbarView = function(view, model){
    this.model = model;

    this.load();
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
