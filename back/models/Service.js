const mongoose = require("mongoose");

const { Schema } = mongoose; //import Schema

const serviceSchema = new Schema({
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true } // save the date of creation and update of the record
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = {
  Service,
  serviceSchema,
};


