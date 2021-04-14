import React, { useState } from "react";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function Note(props) {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    title: '',
    content: ''
  });


  function handleOpen() {
    setOpen(true);
    // add data to modal
    setInput({
      title: props.title,
      content: props.content
    });
  }

  const handleClose = () => setOpen(false);


  function handleDelete() {
    axios.delete('/api/delete/' + props.id);
    props.onDelete(props.id);
    console.log("deleting note");
  }


  function handleUpdate() {
    const updatedNote = {
      _id: props.id,
      title: input.title,
      content: input.content
    }
    axios.put('/api/update/' + props.id, updatedNote);
    handleClose();
  }


  function handleChange(event) {
    const {value, name} = event.target;
    
    setInput(prevInput => {
        return {
            ...prevInput,
            [name]: value, 
        };
    });
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>   
      <button onClick={handleDelete}><DeleteIcon /></button>
      <button onClick={handleOpen}><EditIcon /></button>


      <Dialog className="edit-note" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
          <TextField className="edit-field" label="title" name="title" value={input.title} onChange={handleChange} />
          <TextField className="edit-field" label="content" name="content" value={input.content} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Note;