var ClientBallMiniMap = function(container, color, cellSize) {
    this.container = container;
    this.cellSize = cellSize;

    this.sprite = new PIXI.Sprite.fromImage("images/white-square4_no_border.png");
    this.sprite.tint = color;

    container.addChild(this.sprite);

};

ClientBallMiniMap.prototype.destroy = function(container) {
    container.removeChild(this.sprite);
};

ClientBallMiniMap.prototype.onFrameUpdate = function(timeStep) {
    this.sprite.x += (this.sprite.tx - this.sprite.x) * timeStep * 6;
    this.sprite.y += (this.sprite.ty - this.sprite.y) * timeStep * 6;
};

ClientBallMiniMap.prototype.setPos = function(otherPlayerX, otherPlayerY, playingUserX, playingUserY, miniMapSize) {
    var xDistanceFromPlayer = otherPlayerX - playingUserX;
    var yDistanceFromPlayer = otherPlayerY - playingUserY;
    this.sprite.x = xDistanceFromPlayer + miniMapSize / 2 - this.cellSize / 2;
    this.sprite.y = yDistanceFromPlayer + miniMapSize / 2 - this.cellSize / 2;
};

ClientBallMiniMap.prototype.moveTo = function(otherPlayerX, otherPlayerY, playingUserX, playingUserY, miniMapSize) {
    var xDistanceFromPlayer = otherPlayerX - playingUserX;
    var yDistanceFromPlayer = otherPlayerY - playingUserY;
    this.sprite.tx = xDistanceFromPlayer + miniMapSize / 2 - this.cellSize / 2;
    this.sprite.ty = yDistanceFromPlayer + miniMapSize / 2 - this.cellSize / 2;
};
