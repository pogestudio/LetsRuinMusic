var MiniMapBackground = function(model, size) {
    this.model = model;

    this.graphics = new PIXI.Graphics();
    // set a fill and line style
    this.graphics.beginFill(0x000000);
    this.graphics.lineStyle(2, 0x777777, 0.5);
    this.graphics.drawRect(0, 0, size, size);
    // var backGroundTexture = PIXI.Texture.fromImage("images/black-square1_no_border.png");
    // // to work in webGL the texture size must be a power of two
    // this.tileSprite = new PIXI.TilingSprite(backGroundTexture, size, size);
    this.graphics.setInteractive(true);
    this.graphics.hitArea = new PIXI.Rectangle(0, 0, size, size);
    this.size = size;

};
