var AudioView = function(model){
	this.model = model;	
	this.cells = {};

	this.tones = [
		45,47,48,50,52,53,55,
		57,59,60,62,64,65,67,
		69,71,72,74,76,77,79
	];

	this.xpos = 0;

	this.updateSound();
	this.loadInstrument();
}

AudioView.prototype.loadInstrument = function ()
{
	MIDI.loadPlugin({
		soundfontUrl: "././soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// MIDI.programChange(0,73);
			// play the note
			MIDI.setVolume(0, 127);
	        	//MIDI.noteOn(0, note, velocity, delay) // Play middle C on Channel 0
			//MIDI.noteOff(0, note, delay + 2);
		}
	});
}

AudioView.prototype.updateSound = function ()
{
	var audioView = this;
	setInterval(function(){
		audioView.updateSoundY();
	}, 300);
}

AudioView.prototype.updateSoundY = function ()
{
	var x = 16;
	var y = 16;

	for(var i = y; i < 32; i++){
		if(this.model.getCellLocal(x+this.xpos,i) == 1){
			var note = this.tones[y % this.tones.length];
			this.playTone(note,127,0)
		}	
	}
	this.xpos = (this.xpos + 1) % 16;
}

AudioView.prototype.playTone = function (note, velocity, delay)
{
	 MIDI.noteOn(0, note, velocity, delay);
	 MIDI.noteOff(0, note, delay + 2);
}
