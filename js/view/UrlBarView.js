var UrlBarView = function(model) {
    model.addObserver(this);
};

//Notification from model
UrlBarView.prototype.update = function(model) {
    window.history.pushState({}, "Title", '?xpos=' + model.x + '&ypos=' + model.y);
};
