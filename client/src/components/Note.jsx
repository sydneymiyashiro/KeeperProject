import React from "react";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {

  function handleClick() {
    axios.delete('/api/delete/' + props.id);
    props.onDelete(props.id);
    console.log("deleting note");
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>   
      <button onClick={handleClick}><DeleteIcon /></button>
    </div>
  );
}

export default Note;