$(function() {

    //We instantiate our model
    var model = new CanvasModel();
    //We instantiate our audioModel
    var audioModel = new AudioModel();
    model.setSize(16, 16);

    var rendererContainer = new Renderer();

    var audioViewController = new AudioViewController(model, audioModel);

    //And create the needed controllers and views
    var canvasView = new CanvasView($("#canvasView"), model, rendererContainer, audioViewController);
    var canvasViewController = new CanvasViewController(canvasView, model, rendererContainer);

    //audioViewController.addObserver(canvasView);

    //And create the needed controllers and views
    var miniMapView = new MiniMapView(model, rendererContainer);
    var urlBarView = new UrlBarView(model);
    //var miniMapViewController = new MiniMapViewController(miniMapView, model);

    var toolbarView = new ToolbarView($("#toolbarView"), model);
    var toolbarViewController = new ToolbarViewController(toolbarView, audioModel, model);
    toolbarViewController.addObserver(audioViewController);

    var userInstructionsView = new UserInstructionsView($("#userInstructionsView"));
    audioViewController.addObserverOfLoading(userInstructionsView);

    var connection = new Connection(model);
    //connection.connect("ws://192.168.1.101:12001");
    connection.connect("ws://qazeh.no-ip.info:12058");
    model.connection = connection;

    model.notifyObservers();

    model.setCell(3, 8, 0);

    model.notifyObservers();

});
window.navigate = {};
