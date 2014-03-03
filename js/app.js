$(function() {
    //The global variable so we can access it from other controller and views
    window.stage = "starter";

    //We instantiate our model
    var model = new CanvasModel();
    model.setSize(48, 48);

    //Test data
    model.setCell(3, 5, 1);
    model.setCell(4, 5, 1);
    model.setCell(5, 5, 1);
    model.setCell(6, 5, 1);
    model.setCell(7, 5, 1);

    model.notifyObservers();

    //And create the needed controllers and views
    var canvasView = new CanvasView($("#canvasView"), model);
    var canvasViewController = new CanvasViewController(canvasView, model);

});
window.navigate = {};
