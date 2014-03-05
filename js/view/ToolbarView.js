var ToolbarView = function(view, audioModel, model){
    this.audioModel = audioModel;
    this.model = model;
    this.instrNameList = this.audioModel.getInstrNameList();

    this.selInstr = null;
    this.load();
}

ToolbarView.prototype.load = function(){    
    var view = this;
    this.selInstr = 1;
    this.model.setInstrNr(this.selInstr);
    view.guitar = true;
    view.sax = false;
    view.piano = false;
    view.drum = false;

    var gui = new dat.GUI();

    var CB1Controller = gui.add(view, "guitar").listen();
    CB1Controller.onChange(function(value){
        view.guitar = true;
        view.sax = false;
	view.piano = false;
	view.drum = false;
	view.selInstr = 1;
	view.model.setInstrNr(view.selInstr);
	console.log(view.selInstr);
    });

    var CB1Controller = gui.add(view, "sax").listen();
    CB1Controller.onChange(function(value){
        view.guitar = false;
        view.sax = true;
	view.piano = false;
	view.drum = false;
	view.selInstr = 2;
	view.model.setInstrNr(view.selInstr);
	console.log(view.selInstr);
    });

    var CB1Controller = gui.add(view, "piano").listen();
    CB1Controller.onChange(function(value){
        view.guitar = false;
        view.sax = false;
	view.piano = true;
	view.drum = false;
	view.selInstr = 3;
	view.model.setInstrNr(view.selInstr);
	console.log(view.selInstr);
    });

    var CB1Controller = gui.add(view, "drum").listen();
    CB1Controller.onChange(function(value){
        view.guitar = false;
        view.sax = false;
	view.piano = false;
	view.drum = true;
	view.selInstr = 4;
	view.model.setInstrNr(view.selInstr);
	console.log(view.selInstr);
    });

}

