require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
});

const notesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model("Note", notesSchema);


// API Routes 
app.get('/api/notes', function(req, res) {
  Note.find({}, function(err, foundNotes) {
      if (!err) {
          res.json(foundNotes);
      } else {
          console.log(err);
      }
  });
});


app.post('/api/create', function(req, res) {
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Note({
      title: title,
      content: content
  });
  newNote.save();
});


app.delete('/api/delete/:id', function(req, res) {
  Note.deleteOne({_id: req.params.id}, function(err) {
    if (!err) {
      console.log("note deleted");
    } else {
      console.log(err);
    }
  });
});


app.put('/api/update/:id', function(req, res) {
  Note.findByIdAndUpdate(
    req.params.id,
    {title: req.body.title, content: req.body.content},
    function(err) {
      if (!err) {
        res.send("Successfully updated article");
      } else {
        res.send(err);
      }
    }
  );
});


// For Heroku Deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(PORT, function() {
  console.log(`Server listening on ${PORT}`);
});