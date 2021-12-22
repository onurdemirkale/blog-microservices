NOTES:

LIST OF SERVICES:

1. POSTS (PORT 4000)
2. COMMENTS (PORT 4001)
3. FEED (PORT 4003)
4. EVENT BUS (PORT 4005)

LIST OF TYPES OF EVENTS:

1. 'PostCreated'
2. 'CommentCreated'

STRUCTURE OF A POST:
type: string,
data:{
postId,
postTitle
}

STRUCTURE OF A COMMENT:
type: string,
data: {
postId,
commentId,
commentContent
}

STRUCTURE OF FEED:
data:{
postId,
postTitle,
postComments: []
}
