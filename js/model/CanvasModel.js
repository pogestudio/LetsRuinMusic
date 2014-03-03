var CanvasModel = function() {

    //this model!!

    this.testCall = function()
    {
        console.log('testing sexting?');
    };

    /*****************************************  
          Observable implementation    
    *****************************************/

    var observers = [];

    this.addObserver = function(observer) {
        observers.push(observer);
    }

    var notifyObservers = function(arg) {
        for (var i = 0; i < observers.length; i++) {
            observers[i].update(arg);
        }
    }
};
