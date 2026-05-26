const { Jimp } = require('jimp');

Jimp.read('public/images/Gemini_Generated_Image_7u29fv7u29fv7u29-removebg-preview.png')
  .then(image => {
    // Crop the image to a perfect 369x369 square centered on the gear
    image.crop({ x: 155, y: 0, w: 369, h: 369 });
    
    // Save it over the original file
    return image.write('public/images/Gemini_Generated_Image_7u29fv7u29fv7u29-removebg-preview.png');
  })
  .then(() => {
    console.log('Successfully cropped image to a perfect square and saved!');
  })
  .catch(err => {
    console.error('Error cropping image:', err);
  });
