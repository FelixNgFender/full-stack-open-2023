const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose.set("strictQuery", false);
mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, "User name required"],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length >= 8 && /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
