$(function() {
    //The global variable so we can access it from other controller and views
    window.stage = "starter";

    //We instantiate our model
    var model = new CanvasModel();
    model.setSize(48, 48);

    //Test data
    model.setCell(16, 16, 1);
    model.setCell(18, 20, 1);
    model.setCell(19, 24, 1);
    model.setCell(24, 30, 1);
    model.setCell(22, 19, 1);
    model.setCell(29, 29, 1);
    model.setCell(30, 27, 1);
    model.setCell(21, 19, 1);
    model.setCell(26, 18, 2);
    model.setCell(24, 16, 1);
    model.setCell(27, 17, 1);
    model.setCell(28, 18, 1);
    model.setCell(29, 19, 1);
    model.setCell(30, 20, 1);
    model.setCell(31, 21, 1);
    model.setCell(32, 22, 1);
    model.setCell(17, 23, 1);
    model.setCell(18, 24, 1);

    model.setCell(22, 19, 3);
    model.setCell(18, 20, 3);
    model.setCell(23, 21, 3);
    model.setCell(27, 22, 3);
    model.setCell(19, 23, 3);
    model.setCell(29, 24, 3);


    model.setCell(17, 27, 3);
    model.setCell(17, 28, 3);
    model.setCell(18, 29, 3);
    model.setCell(20, 30, 3);
    model.setCell(19, 31, 3);
    model.setCell(21, 32, 3);

    model.notifyObservers();

    //And create the needed controllers and views
    var canvasView = new CanvasView($("#canvasView"), model);
    var canvasViewController = new CanvasViewController(canvasView, model);
	
    var audioViewController = new AudioViewController(model);
});
window.navigate = {};
