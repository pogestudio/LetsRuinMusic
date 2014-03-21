var UserInstructionsView = function(userView) {

	var self = this;
	this.userInstructionsView = userView;
    this.div = $(userView);

    var p1 = document.createElement("p");
    p1.innerHTML = "Use <span>W A S D</span> to move; <span>1-4</span> for instruments.";    
    var p2 = document.createElement("p");
    p2.innerHTML = "Click and drag on the side to move around.";
    this.div.append(p1);
    this.div.append(p2);

    //event listeners for to hide the user instructions
    window.addEventListener('keyup', function (e) {
        self.hideInstructions();
    }, false);
    window.addEventListener('mouseup',function (e) {
        self.hideInstructions();
    },false);
}

UserInstructionsView.prototype.loadingFinished = function() {
    console.log("loading finished!");
}

UserInstructionsView.prototype.hideInstructions = function() {
	$(this.userInstructionsView).fadeOut("slow");
}
