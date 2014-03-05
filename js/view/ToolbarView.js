var ToolbarView = function(view, audioModel){
    this.model = audioModel;
    this.instrNameList = this.model.getInstrNameList();

    this.selInstr = null;
    this.load();
}

ToolbarView.prototype.load = function(){    
    var view = this;
    this.selInstr = 1;
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
	console.log(view.getCurrInstr());
    });

    var CB1Controller = gui.add(view, "sax").listen();
    CB1Controller.onChange(function(value){
        view.guitar = false;
        view.sax = true;
	view.piano = false;
	view.drum = false;
	view.selInstr = 2;
	console.log(view.getCurrInstr());
    });

    var CB1Controller = gui.add(view, "piano").listen();
    CB1Controller.onChange(function(value){
        view.guitar = false;
        view.sax = false;
	view.piano = true;
	view.drum = false;
	view.selInstr = 3;
	console.log(view.getCurrInstr());
    });

    var CB1Controller = gui.add(view, "drum").listen();
    CB1Controller.onChange(function(value){
        view.guitar = false;
        view.sax = false;
	view.piano = false;
	view.drum = true;
	view.selInstr = 4;
	console.log(view.getCurrInstr());
    });

}

ToolbarView.prototype.getCurrInstr = function(){
    return this.selInstr;
}
