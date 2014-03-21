var ToolbarViewController = function(view, audioModel, model){
    this.view = view;
    this.audioModel = audioModel;
    this.model = model;
    this.model.addObserver(this);

    this.observers = [];

    this.loadControls();
    this.loadEventListeners();

    this.model.setInstrNr(1);

}

ToolbarViewController.prototype.loadControls = function(){
    var cont = this;
    
    this.view.CB1Controller = this.view.gui.add(this.view, "guitar").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.selInstrument(1);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "glockenspiel").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.selInstrument(2);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "piano").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.selInstrument(3);
    });

    this.view.CB1Controller = this.view.gui.add(this.view, "drum").listen();
    this.view.CB1Controller.onChange(function(value){
    	cont.selInstrument(4);
    });

    this.view.CB2Controller = this.view.gui.add(this.view, "delay", 100, 300, 1).listen();
    this.view.CB2Controller.onChange(function(value){
        cont.notifyObservers(value);
    });

    this.view.CB4Controller = this.view.gui.add(this.view, "posx").listen()
    this.view.CB4Controller.onChange(function(value){
        cont.teleport(0, value)
    }); 
    this.view.CB4Controller = this.view.gui.add(this.view, "posy").listen()
    this.view.CB4Controller.onChange(function(value){
        cont.teleport(1, value);
    });

    this.view.CB5Controller= this.view.gui.add(this.view, "share");
}

ToolbarViewController.prototype.update = function(model) { 
    this.view.posx = this.model.x;
    this.view.posy = this.model.y;
};


ToolbarViewController.prototype.teleport = function (axis, value){
    var value = parseInt(value);
    if(!isNaN(value)){
        if(axis == 0){
            this.model.setPositionAndJump(value, this.model.y);
        }
        else if(axis == 1){
            this.model.setPositionAndJump(this.model.x, value);
        }
    }
}

ToolbarViewController.prototype.truefalse = function(b1, b2, b3, b4){
    this.view.guitar = b1;
    this.view.glockenspiel= b2;
    this.view.piano = b3;
    this.view.drum = b4;
}

ToolbarViewController.prototype.selInstrument = function(instrNr){
    switch(instrNr){
        case 1:
            this.truefalse(true,false,false,false);
            this.model.setInstrNr(1);
            break;
        case 2:
            this.truefalse(false,true,false,false);
            this.model.setInstrNr(2);
            break;
        case 3:
            this.truefalse(false,false,true,false);
            this.model.setInstrNr(3);
            break;
        case 4:
            this.truefalse(false,false,false,true);
            this.model.setInstrNr(4);
            break;
    }
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

ToolbarViewController.prototype.loadEventListeners = function () {
    var tb = this;
    window.addEventListener('keyup', function (e) {
        switch(e.keyCode){
            case 49:
                tb.selInstrument(1);
                break;
            case 50:
                tb.selInstrument(2);
                break;
            case 51:
                tb.selInstrument(3);
                break;
            case 52:
                tb.selInstrument(4);
                break;
        }
    }, false);
}
