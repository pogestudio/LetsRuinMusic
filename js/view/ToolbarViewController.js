var ToolbarViewController = function(view, audioModel, model){
    this.view = view;
    this.audioModel = audioModel;
    this.model = model;

    this.observers = [];

    this.loadControls();

    this.model.setInstrNr(1);
}

ToolbarViewController.prototype.loadControls = function(){
    var cont = this;
    
    this.view.CB1Controller = this.view.gui.add(this.view, "guitar").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.truefalse(true, false, false, false);
    	cont.model.setInstrNr(1);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "glockenspiel").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.truefalse(false, true, false, false);
    	cont.model.setInstrNr(2);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "piano").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.truefalse(false, false, true, false);
    	cont.model.setInstrNr(3);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "drum").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.truefalse(false, false, false, true);
    	cont.model.setInstrNr(4);
    });

    this.view.CB2Controller = this.view.gui.add(this.view, "delay", 100, 300, 1).listen();
    this.view.CB2Controller.onChange(function(value){
        cont.notifyObservers(value);
    });
}

ToolbarViewController.prototype.truefalse = function(b1, b2, b3, b4){
    this.view.guitar = b1;
    this.view.glockenspiel= b2;
    this.view.piano = b3;
    this.view.drum = b4;
}

ToolbarViewController.prototype.addObserver = function(observer) {
    this.observers.push(observer);
}

ToolbarViewController.prototype.notifyObservers = function(value) {
    for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].changeDuration = true;
        this.observers[i].clearSound();
        this.observers[i].changeTempo(value);
    }
}