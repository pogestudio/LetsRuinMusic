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
    var miniMapViewController = new MiniMapViewController(model, miniMapView);
    var urlBarView = new UrlBarView(model);
    //var miniMapViewController = new MiniMapViewController(miniMapView, model);

    var toolbarView = new ToolbarView($("#toolbarView"), model);
    var toolbarViewController = new ToolbarViewController(toolbarView, audioModel, model);
    toolbarViewController.addObserver(audioViewController);

    var userInstructionsView = new UserInstructionsView($("#userInstructionsView"));
    audioViewController.addObserverOfLoading(userInstructionsView);

    var connection = new Connection(model);
    connection.connect("ws://ec2-54-186-113-65.us-west-2.compute.amazonaws.com:12001");
    //connection.connect("ws://qazeh.no-ip.info:12058");
    model.connection = connection;

    model.notifyObservers();

    model.setCell(3, 8, 0);

    model.notifyObservers();

});
window.navigate = {};
