import PostCreate from './PostCreate';
import React from 'react';
import Feed from './Feed';

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <Feed />
    </div>
  );
};

export default App;
