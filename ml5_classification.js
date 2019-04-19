let webcam;
let model;
let classifier;
let prediction = "";

//runs when page is loading
function setup()
{
    createCanvas(500, 500);
    webcam = createCapture(VIDEO);
    //look in draw function :)
    webcam.hide();
    background(0);

    //argument is the name of the model to use, which is MobileNet model.
    //ml5 can support different models in the future (different classifiers or regressors).
    //  function is done loading.
    //  Needed because js tries to do many things at once.

    model = ml5.featureExtractor("MobileNet", modelReady);
    classifier = model.classification(webcam);
   
    // var addDuc = createButton("Add Duc");
    // //anonymous function to handle button input.
    // addDuc.mousePressed(function() {
    //     classifier.addImage("Duc");
    // });

    var addPhone = createButton("Add Phone");
    addPhone.mousePressed(function() {
        classifier.addImage("Phone");
    });

    var addHappy = createButton("Add Happy");
    addHappy.mousePressed(function() {
        classifier.addImage("Happy");
    });

    var addSad = createButton("Add Sad");
    addSad.mousePressed(function() {
        classifier.addImage("Sad");
    });

    var trainModel = createButton("Train Model");
    trainModel.mousePressed(function() {
        classifier.train(trainingProcess)
    });

    var save = createButton("Save Model");
    save.mousePressed(function() {
        classifier.save();
    });

    var load = createButton("Load Model");
    load.mousePressed(function() {
        classifier.load("model.json", customModelReady);
    });
}

function modelReady()
{
    prediction = "Model Ready";
}

function customModelReady()
{
    prediction = "Custom Model Ready";
    classifier.classify(imagePrediction);
}

//puts the webcam in a draw-able area, so you can draw over it!
function draw()
{
    background(0)
    image(webcam, 0, 0, 600, 450);
    fill(255);
    textSize(32);
    text(prediction, 10, height - 10);
}

//when training a model, there is a 'loss' involved from what the
//expected answer is. E.g. if given an image of a cat, and the model
//says the probability that it's a cat is 0.8, the loss is 0.2.
function trainingProcess(loss)
{
    //eventually the loss will become null after being trained.
    if (loss == null)
    {
        console.log("Training arc complete :)");
        classifier.classify(imagePrediction);
    }
}

//have to pass error, since method wants to handle error checking.
function imagePrediction(error, result)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        prediction = result;
        //calls itself because we want to constantly check what the image is.
        classifier.classify(imagePrediction);
    }
}