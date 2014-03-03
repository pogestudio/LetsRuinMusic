$(function() {
    //The global variable so we can access it from other controller and views
    window.stage = "starter";

    //We instantiate our model
    var model = new CanvasModel();

    //And create the needed controllers and views
    var canvasView = new CanvasView($("#canvasView"), model);
    var canvasViewController = new CanvasViewController(canvasView, model);

});
window.navigate = {};
