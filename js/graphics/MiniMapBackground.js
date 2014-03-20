var MiniMapBackground = function(model, size) {
    this.model = model;
    var backGroundTexture = PIXI.Texture.fromImage("images/black-square1_no_border.png");
    // to work in webGL the texture size must be a power of two
    this.tileSprite = new PIXI.TilingSprite(backGroundTexture, size, size);
    this.tileSprite.setInteractive(true);
    this.tileSprite.hitArea = new PIXI.Rectangle(0, 0, size, size);
    this.size = size;

    var self = this;
    this.tileSprite.click = function(data) {
        self.navigateAway(data.global.x,data.global.y);
    };
};

MiniMapBackground.prototype.navigateAway = function(globalX, globalY) {
    var miniMapOffset = (this.size - 16) / 2;

    //if user clicks on (miniMapOffset,miniMapOffset), he hit right where he is.
    //if it's more X, then he should go right
    var stepsToGoRight = globalX - miniMapOffset;
    //if it's more Y, thn he should go down
    var stepsToGoDown = globalY - miniMapOffset;

    var newX = this.model.x + stepsToGoRight;
    var newY = this.model.y + stepsToGoDown;
    this.model.setPositionAndJump(newX,newY);
};
