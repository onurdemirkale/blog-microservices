import React from 'react';

const CommentList = ({ postComments }) => {
  const renderedComments = postComments.map((postComment) => {
    const { commentContent, commentId } = postComment;

    return <li key={commentId}>{commentContent}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
