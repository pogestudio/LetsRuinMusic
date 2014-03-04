var AudioViewController = function(model){
    this.model = model;	

    this.tones = [
	45,47,48,50,52,53,55,
	57,59,60,62,64,65,67,
	69,71,72,74,76,77,79
    ];
    
    this.instruments = {}

    this.instruments['1'] = 24//acoustic_guitar_nylon
    this.instruments['2'] = 65; //alto_sax
    this.instruments['3'] = 0; //acoustic_grand_piano

    this.interval = null;
    this.loadInstrument();
    this.xpos = 0;
    this.updateSound(300); //300ms interval
}


AudioViewController.prototype.loadInstrument = function ()
{
    MIDI.loadPlugin({
	soundfontUrl: "././soundfont/",
	instrument: "acoustic_guitar_nylon",
	instruments: ["acoustic_grand_piano", "alto_sax", "acoustic_guitar_nylon"],
    });
}

AudioViewController.prototype.updateSound = function (duration)
{
    if (this.interval != null)
	window.clearInterval(this.interval);

    var AudioViewController = this;
    this.interval = setInterval(function(){
	AudioViewController.updateSoundY();
    }, duration);
}

AudioViewController.prototype.updateSoundY = function ()
{
    var x = 16;
    var y = 16;

    for(var i = y; i < 32; i++){
	var dbint = this.model.getCellLocal(x+this.xpos,i);
	if(dbint != 0 && dbint <= Object.keys(this.instruments).length){
	    var note = this.tones[y % this.tones.length];
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
