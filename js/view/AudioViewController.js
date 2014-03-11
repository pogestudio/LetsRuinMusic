var AudioViewController = function(model, audioModel) {
    this.model = model;
    this.audioModel = audioModel;

    this.tones = this.audioModel.getTones();
    this.instruments = this.audioModel.getInstruments();

    this.interval = null;
    this.loadInstrument();
    this.xpos = 0;
    this.duration = 300;

    this.observers = [];
}

AudioViewController.prototype.addObserver = function(observer) {
    this.observers.push(observer);
}


AudioViewController.prototype.notifyObservers = function(x, y) {
    for (var i = 0; i < this.observers.length; i++) {
        // assumes that canvasView will do some animations on onPlaySound() method
        this.observers[i].onPlaySound(x, y);
    }
}

AudioViewController.prototype.loadInstrument = function() {
    var avc = this;
    MIDI.loadPlugin({
        soundfontUrl: "././soundfont/",
        instruments: this.audioModel.getInstrNameList(),
        callback: avc.updateSound,
        source: this,
    });
}

AudioViewController.prototype.updateSound = function() {
    if (this.source.interval != null)
        window.clearInterval(this.source.interval);

    var AudioViewController = this.source;
    this.source.interval = setInterval(function() {
        AudioViewController.updateSoundY();
    }, AudioViewController.duration);
}

AudioViewController.prototype.updateSoundY = function() {
    //get the new X
    //get the new Y
    var x = this.model.x;
    var y = this.model.y;

    for (var i = y; i < y + 16; i++) {
        var dbint = this.model.getCell(x + this.xpos, i);
        if (dbint != 0 && dbint <= Object.keys(this.instruments).length) {
            var note = this.tones[(32 - i) % this.tones.length];
            var instr = this.instruments[dbint];
            // onPlaySound
            this.notifyObservers(x + this.xpos, i);
            this.playToneInstr(note, 127, 0, instr);
        }
    }
    this.xpos = (this.xpos + 1) % 16;
}

AudioViewController.prototype.playToneInstr = function(note, velocity, delay, instr) {
    MIDI.programChange(0, instr);
    MIDI.noteOn(0, note, velocity, delay);
    //    MIDI.noteOff(0, note, delay + 2); // It will get offed automatically
}
