import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import {createPost, updatePost} from '../../actions/posts'
import {StyledPaper, StyledSubmitButton} from './styles.js'


const Form = ({currentId, setCurrentId, postData, setPostData, initialPostDataState}) => {
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,postData))  
    } else {
      dispatch(createPost(postData))
    }
  };
  const clear = () => {
    setPostData(initialPostDataState)
  };

  
  return (
    <StyledPaper>
      <form className="root form" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6"> Creating a Post</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <StyledSubmitButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </StyledSubmitButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </StyledPaper>
  );
};

export default Form;
