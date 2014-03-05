var AudioModel = function () {
    
    this.instruments = {}
    this.instruments['1'] = 24; // acoustic_guitar_nylon
    this.instruments['2'] = 65; // alto_sax
    this.instruments['3'] = 0; // acoustic_grand_piano
    this.instruments['4'] = 118; //synth_drum

    this.instrList =  ["acoustic_guitar_nylon", 
		       "alto_sax", 
		       "acoustic_grand_piano", 
		       "synth_drum"];

    this.dic = {}
};

AudioModel.prototype.getInstrNameList = function(){
    return this.instrList;
};

AudioModel.prototype.getInstruments = function(){
    return this.instruments;
};
