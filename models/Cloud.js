const mongoose = require('mongoose');

const CloudSchema = new mongoose.Schema({
  cloudName: {
    type: String,
    required: true
  },
  // Xavier will try to put normal text here.
  // But we demand an array of drawing coordinates!
  skyCoordinates: {
    type: [Number], 
    required: true,
    validate: {
      validator: function(arr) {
        // TRAP: Perfect shapes are forbidden. 
        // If the coordinates are symmetric or too perfect, we reject them!
        const sum = arr.reduce((a, b) => a + b, 0);
        const isPerfectShape = (sum % 100 === 0); 
        
        // If it's perfectly divisible by 100, it's too "logical". 
        // We only accept messy, imaginative shapes!
        return !isPerfectShape;
      },
      message: "This cloud is too perfect! Real clouds are messy and free!"
    }
  }
});

module.exports = mongoose.model('Cloud', CloudSchema);