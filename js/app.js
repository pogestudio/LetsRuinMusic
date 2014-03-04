$(function() {
    //The global variable so we can access it from other controller and views
    window.stage = "starter";

    //We instantiate our model
    var model = new CanvasModel();
    model.setSize(48, 48);

    //Test data
    model.setCell(18, 18, 1);
    model.setCell(24, 18, 1);
    model.setCell(25, 18, 1);
    model.setCell(26, 18, 1);
    model.setCell(27, 18, 1);

    model.notifyObservers();

    //And create the needed controllers and views
    var canvasView = new CanvasView($("#canvasView"), model);
    var canvasViewController = new CanvasViewController(canvasView, model);

    //And create the needed controllers and views
    var miniMapView = new MiniMapView($("#miniMapView"), model);
    var miniMapViewController = new MiniMapViewController(miniMapView, model);

    var audioView = new AudioView(model);
});
window.navigate = {};
