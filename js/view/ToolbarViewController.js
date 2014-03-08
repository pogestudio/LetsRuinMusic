var ToolbarViewController = function(view, audioModel, model){
    this.view = view;
    this.audioModel = audioModel;
    this.model = model;

    this.loadControls();
}

ToolbarViewController.prototype.loadControls = function(){
    var cont = this;
    
    this.view.CB1Controller = this.view.gui.add(this.view, "guitar").listen();
    this.view.CB1Controller.onChange(function(value){
	cont.truefalse(true, false, false, false);
	cont.model.setInstrNr(1);
	console.log(1);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "sax").listen();
    this.view.CB1Controller.onChange(function(value){
	cont.truefalse(false, true, false, false);
	cont.model.setInstrNr(2);
	console.log(2);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "piano").listen();
    this.view.CB1Controller.onChange(function(value){
	cont.truefalse(false, false, true, false);
	cont.model.setInstrNr(3);
	console.log(3);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "drum").listen();
    this.view.CB1Controller.onChange(function(value){
	cont.truefalse(false, false, false, true);
	cont.model.setInstrNr(4);
	console.log(4);
    });
}

ToolbarViewController.prototype.truefalse = function(b1, b2, b3, b4){
    this.view.guitar = b1;
    this.view.sax= b2;
    this.view.piano = b3;
    this.view.drum = b4;
}
