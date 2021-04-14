import React, { useState } from "react";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

function CreateArea(props) {
  const [input, setInput] = useState({
      title: '',
      content: ''
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const {value, name} = event.target;
    
    setInput(prevInput => {
        return {
            ...prevInput,
            [name]: value, 
        };
    });
  }

  function submitNote(event) {
    // Update page to include new note
    props.onAdd(input);
    // Prevent screen from refreshing
    event.preventDefault();
    const newNote = {
      title: input.title,
      content: input.content
    }

    axios.post('/api/create', newNote);
    setInput({title: '', content: ''});
  }

  function expand() {
    return setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input onChange={handleChange} autoComplete="off" name="title" placeholder="Title" value={input.title} />} 
        <textarea onClick={expand} onChange={handleChange} name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={input.content} />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
