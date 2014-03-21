var AudioViewController = function(model, audioModel) {
    this.model = model;
    this.audioModel = audioModel;

    this.tones = this.audioModel.getTones();
    this.instruments = this.audioModel.getInstruments();

    this.interval = null;
    this.loadInstrument();
    this.xpos = 0;
    this.duration = 300;
    this.changeDuration = false;

    this.observers = [];
}

AudioViewController.prototype.addObserver = function(observer) {
    this.observers.push(observer);
}


AudioViewController.prototype.notifyObservers = function(x, y) {
    for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].onPlaySound(x, y);
    }
}

AudioViewController.prototype.loadInstrument = function() {
    var avc = this;
    MIDI.loadPlugin({
        soundfontUrl: "././soundfont/",
        instruments: this.audioModel.getInstrNameList(),
        callback: avc.initInterval,
        source: this,
    });
    this.closeLoadingScreen();
}

AudioViewController.prototype.closeLoadingScreen = function(){
 for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].closeInstructions(x, y);
    }   
}

AudioViewController.prototype.initInterval = function() {
    var AudioViewController = this.source;
    AudioViewController.interval = setInterval(function() {
        AudioViewController.updateSoundY();
    }, AudioViewController.duration);

    closeLoadingScreen();
}

AudioViewController.prototype.closeLoadingScreen = function(){
 for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].closeInstructions(x, y);
    }
}

AudioViewController.prototype.changeTempo = function(value) {
    var AudioViewController = this;
    AudioViewController.interval = setInterval(function() {
        AudioViewController.updateSoundY();
    }, value);
}

AudioViewController.prototype.clearSound = function() {
    if (this.changeDuration){
        window.clearInterval(this.interval);
        this.changeDuration = false;
    }
}
AudioViewController
.prototype.updateSoundY = function() {
    var x = this.model.x;
    var y = this.model.y;

    for (var i = y; i < y + 16; i++) {
        var dbint = this.model.getCell(x + this.xpos, i);
        if (dbint != 0 && dbint <= Object.keys(this.instruments).length) {
            var note = this.tones[(y + 16 - i) % this.tones.length];
            var instr = this.instruments[dbint];
            this.notifyObservers(x + this.xpos, i);
            this.playToneInstr(note, 127, 1, instr);
        }
    }
    this.xpos = (this.xpos + 1) % 16;
}

AudioViewController.prototype.playToneInstr = function(note, velocity, delay, instr) {
    MIDI.programChange(0, instr);
    MIDI.noteOn(0, note, velocity, 0);
    //MIDI.noteOff(0, note, delay);
}
