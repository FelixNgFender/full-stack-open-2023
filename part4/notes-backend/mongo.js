require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(uri);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is Easy",
//   important: true,
// });

// // eslint-disable-next-line no-unused-vars
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
