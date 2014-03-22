var MiniMapViewController = function(model, view) {
    this.model = model;
    this.view = view;

    var self = this;
    view.background.graphics.click = function (data) {
        self.navigateAway(data.global.x, data.global.y);
    };
};

MiniMapViewController.prototype.navigateAway = function (globalX, globalY) {
    var miniMapOffset = (this.view.miniMapSize + 1 + 16) / 2;

    //if user clicks on (miniMapOffset,miniMapOffset), he hit right where he is.
    //if it's more X, then he should go right
    var stepsToGoRight = globalX - miniMapOffset;
    //if it's more Y, thn he should go down
    var stepsToGoDown = globalY - miniMapOffset;

    var newX = Math.floor(this.model.x + stepsToGoRight);
    var newY = Math.floor(this.model.y + stepsToGoDown);

    this.model.setPositionAndJump(newX, newY);
};
