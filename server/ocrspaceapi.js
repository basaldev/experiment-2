const ocrSpaceApi = require('ocr-space-api');
var keys = require('../var');
var options =  {
    apikey: keys.ocrspace,
    language: 'eng', // Português
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
  };

// Image file to upload
const imageFilePath = "example/example1.jpeg";

// Run and wait the result
ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
  .then(function (parsedResult) {
    console.log('parsedText: \n', parsedResult.parsedText);
    console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
  }).catch(function (err) {
    console.log('ERROR:', err);
  });