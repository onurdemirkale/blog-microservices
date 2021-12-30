import React, { useState } from 'react';
import config from '../config';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [commentContent, setCommentContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://${config.domain}/posts/${postId}/comments`, {
      commentContent,
    });

    setCommentContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="form-control"
          />
        </div>
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
