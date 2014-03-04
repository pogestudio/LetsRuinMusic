var AudioViewController = function(model, audioModel){
    this.model = model;	
    this.audioModel = audioModel;

    this.tones = [
	45,47,48,50,52,53,55,
	57,59,60,62,64,65,67,
	69,71,72,74,76,77,79
    ];
    this.instruments = this.audioModel.getInstruments();

    this.interval = null;
    this.loadInstrument();
    this.xpos = 0;
    this.duration = 300;
}

AudioViewController.prototype.loadInstrument = function () {
    var avc = this;
    MIDI.loadPlugin({
        soundfontUrl: "././soundfont/",
        instruments: this.audioModel.getInstrNameList(),
        callback: avc.updateSound,
        source: this,
    });
}

AudioViewController.prototype.updateSound = function () {
    if (this.source.interval != null)
        window.clearInterval(this.source.interval);

    var AudioViewController = this.source;
    this.source.interval = setInterval(function () {
        AudioViewController.updateSoundY();
    }, AudioViewController.duration);
}

AudioViewController.prototype.updateSoundY = function ()
{
    var x = 16;
    var y = 16;

    for(var i = y; i < 32; i++){
	var dbint = this.model.getCellLocal(x+this.xpos,i);
	if(dbint != 0 && dbint <= Object.keys(this.instruments).length){
	    var note = this.tones[(32-i) % this.tones.length];
	    var instr = this.instruments[dbint];
	    this.playToneInstr(note,127,0,instr);
	}
    }
    this.xpos = (this.xpos + 1) % 16;
}

AudioViewController.prototype.playToneInstr = function (note, velocity, delay, instr)
{
    MIDI.programChange(0, instr);
    MIDI.noteOn(0, note, velocity, delay);
    MIDI.noteOff(0, note, delay + 2);
}

AudioViewController.prototype.playTone = function (note, velocity, delay)
{
    MIDI.noteOn(0, note, velocity, delay);
    MIDI.noteOff(0, note, delay + 2);
}

AudioViewController.prototype.getInstruments = function()
{
    return this.instruments;
}
