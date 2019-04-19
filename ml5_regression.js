let webcam;
let valueSlider;
let model;
let regressor;
let prediction = 0;

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

    model = ml5.featureExtractor("MobileNet");
    regressor = model.regression(webcam)

    //ranges from 0 to 1, default value is 0.5, and increments/decrements by 0.01.
    valueSlider = createSlider(0, 1, 0.5, 0.01);
   
    var addImg = createButton("Add current image");
    //anonymous function to handle button input.
    addImg.mousePressed(function() {
        regressor.addImage(valueSlider.value())
    });

    trainModel = createButton("Train Model");
    trainModel.mousePressed(function() {
        regressor.train(trainingProcess)
    });
}

//puts the webcam in a draw-able area, so you can draw over it!
function draw()
{
    background(0)
    image(webcam, 0, 0, 600, 450);
    fill(255);
    textSize(16);
    text(prediction, 10, height - 10);

    // example from ml5 using a rectangle that follows the regression value.
    // prediction*width because it should move to show where the approx regression value.
    rectMode(CENTER);
    fill(66, 161, 244, 255);
    rect(prediction*width, height/2, 50, 50);
}

//when training a model, there is a 'loss' involved from what the
//expected answer is. E.g. if given an image of a cat, and the model
//says the probability that it's a cat is 0.8, the loss is 0.2.
function trainingProcess(loss)
{
    if (loss == null)
    {
        console.log("Training arc complete :)");
        regressor.predict(imagePrediction);
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
        regressor.predict(imagePrediction);
    }
}