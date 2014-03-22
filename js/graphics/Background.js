var Background = function() {

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("images/black-square32-round.png");
    // to work in webGL the texture size must be a power of two
    this.tilingSprite = new PIXI.TilingSprite(texture, window.innerWidth * 1, window.innerHeight * 1);
    
    var self = this;
    $(window).resize(function () {
        self.tilingSprite.width = window.innerWidth;
        self.tilingSprite.height = window.innerHeight;
    });
}

Background.prototype.position = function(x, y) {
    this.tilingSprite.tilePosition.x = x;
    this.tilingSprite.tilePosition.y = y;
}
