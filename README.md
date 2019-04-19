# ML5-Tests
Just a little messing around with the ML5 library for javascript, with help from the p5.js library as well.

## What is ML5?
ML5 is a javascript library that "aims to make machine learning approachable for a broad audience of artists, creative coders, and students". It gives access to machine learning algorithms in javascript, and is built on top of TensorFlow (ML5 focuses on higher level, while TensorFlow focuses on lower level).

## What is tested here?
Tested image classification and regression, using a webcam. They both take the pre-trained 'MobileNet' model which can detect images and classify them from it's own set of images. These .js files apply 'transfer-learning' to the model, where instead of classifying based on the model's images, we classify based on our own images. 'Feature extraction' is also applied here, where (to my understanding) the model can take our own features (images) and try to interpret data (the webcam) from those features.

## How to use the tests
Index.html can use one of either scripts: ml5_classification.js or ml5_regression.js (the regression script is commented out by default; using both results in undefined behaviour).
You will have a black canvas under your webcam, and when the MobileNet model has loaded, it will say "Model Ready". Have on your webcam the image you want to add (so for example, 'Add Happy' means you should smile in the webcam :D). 

## ml5_classification.js
Press the button as many times as you want and move the feature around, so that the model is able to detect the feature anywhere in the webcam. The default buttons are for adding images of a phone, a happy expression and sad expression, but you can change these to anything (and add more buttons as well). 
Once you are done adding images, press the 'Train Model' button and wait for the model to train itself from the images given. Once it is done loading, for ml5_classification.js it will automatically start predicting what the current image in the webcam is. The more images for a 'feature' with different angles, the more accurate the result is!

## ml5_regression.js
Slide to the desired value you want to give an image (e.g. you can associate the leftmost value 0 with an object in the left most side of the webcam, and the rightmost value 1 with the object in the right most side of the webcam). Add the current image as much as you want, and press 'Train Model' when you're done adding images. The model will give a predicted value out of the maximum (1 in this case) for the image.

## Credit
Thank you to the ml5 library and p5 library, and 'The Coding Train' youtube channel for creating informative videos on how to use ml5 (which are also based on the ml5 examples).
