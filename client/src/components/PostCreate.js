import React, { useState } from 'react';
import config from '../config';
import axios from 'axios';

const PostCreate = () => {
  const [postTitle, setPostTitle] = useState('');

  const onPostSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://${config.domain}/posts`, {
      postTitle,
    });

    setPostTitle('');
  };

  return (
    <div>
      <form onSubmit={onPostSubmit}>
        <div className="form-group">
          <label>Post Title</label>
          <input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="form-control"></input>
        </div>
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
