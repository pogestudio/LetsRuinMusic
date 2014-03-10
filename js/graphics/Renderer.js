var Renderer = function () {

    this.stage = new PIXI.Stage(0x000000, true);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth - 5, window.innerHeight - 5, null);

    document.body.appendChild(this.renderer.view);

    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.top = "0px";
    this.renderer.view.style.left = "0px";

    this.stats = new Stats();
    this.stats.setMode(1); // 0: fps, 1: ms

    // Align top-left
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '200px';

    document.body.appendChild(this.stats.domElement);

    //Auto resize canvas
    //-5 removes scrollbars, quite a hack
    var self = this;
    $(window).resize(function () {
        self.renderer.view.style.width = (window.innerWidth - 5) + "px";
        self.renderer.view.style.height = (window.innerHeight - 5) + "px";
    });

    requestAnimFrame(animate);

    this.frameListeners = [];
    function animate() {
        self.stats.begin();

        self.frameListeners.forEach(function (listener) {
            listener.onFrameRender(self, 0.0166); //TODO: add real timestep
        });

        self.renderer.render(self.stage);
        requestAnimFrame(animate);
        self.stats.end();
    }
}

Renderer.prototype.addFrameListener = function (listener) {
    this.frameListeners.push(listener);
}