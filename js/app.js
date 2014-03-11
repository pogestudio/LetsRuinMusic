$(function() {

    //We instantiate our model
    var model = new CanvasModel();
    //We instantiate our audioModel
    var audioModel = new AudioModel();
    model.setSize(48, 48);

    //Test data
    model.setCell(2, 2, 1);
    model.setCell(5, 5, 1);
    model.setCell(3, 8, 1);
    // model.setCell(19, 19, 1);
    // model.setCell(20, 20, 1);
    // model.setCell(24, 30, 1);
    // model.setCell(22, 19, 1);
    // model.setCell(29, 29, 1);
    // model.setCell(30, 27, 1);
    // model.setCell(21, 19, 1);
    // model.setCell(26, 18, 1);
    // model.setCell(24, 16, 1);
    // model.setCell(27, 17, 1);
    // model.setCell(28, 18, 1);
    // model.setCell(29, 19, 1);
    // model.setCell(30, 20, 1);
    // model.setCell(31, 21, 1);
    // model.setCell(32, 22, 1);
    // model.setCell(17, 23, 1);
    // model.setCell(18, 24, 1);

    // model.setCell(28, 20, 2);

    // model.setCell(29, 20, 4);
    // model.setCell(30, 22, 4);
    // model.setCell(31, 23, 4);
    // model.setCell(32, 24, 4);
    // model.setCell(17, 25, 4);
    // model.setCell(18, 26, 4);


    var rendererContainer = new Renderer();

    var audioViewController = new AudioViewController(model, audioModel);

    //And create the needed controllers and views
    var canvasView = new CanvasView($("#canvasView"), model, rendererContainer, audioViewController);
    var canvasViewController = new CanvasViewController(canvasView, model);

    //audioViewController.addObserver(canvasView);

    //And create the needed controllers and views
    //var miniMapView = new MiniMapView($("#miniMapView"), model, rendererContainer);
    //var miniMapViewController = new MiniMapViewController(miniMapView, model);

    var toolbarView = new ToolbarView($("#toolbarView"), audioModel, model);
    var toolbarViewController = new ToolbarViewController(toolbarView, audioModel, model);

    var connection = new Connection(model);
    connection.connect("ws://localhost:12001");
    model.connection = connection;

    model.notifyObservers();

    model.setCell(3, 8, 0);

    model.notifyObservers();

});
window.navigate = {};
