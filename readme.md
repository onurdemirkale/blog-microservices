A simple blog application made with the microservices architecture. For this simple application, the memory is used as a data store. The event bus is simplified and only made for the sake of learning to understand the underlying technology, it can't be used in a production environment. All of the services are containerized using Docker and the containers are orchestrated using Kubernetes. An ingress-nginx load balancer is used to expose the application to the internet and set the routing rules.

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
