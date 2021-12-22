import React from 'react';
import Feed from './Feed';
import PostCreate from './PostCreate';

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
