import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import config from '../config';
import axios from 'axios';

const Feed = () => {
  const [feed, setFeed] = useState({});

  const fetchFeed = async () => {
    const response = await axios.get(`http://${config.domain}/feed`);
    setFeed(response.data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const renderedFeed = Object.values(feed).map(
    ({ postTitle, postComments, postId }) => {
      return (
        <div
          className="card"
          style={{ width: '%30', marginBottom: '20px' }}
          key={postId}>
          <div className="card-body">
            <h3>{postTitle}</h3>
            <CommentList postComments={postComments} />
            <CommentCreate postId={postId} />
          </div>
        </div>
      );
    }
  );

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedFeed}
    </div>
  );
};

export default Feed;
