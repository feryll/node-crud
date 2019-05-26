var { buildSchema } = require('graphql');
const { RESTDataSource } = require('apollo-datasource-rest');

var schema = buildSchema(`
  type Query {
    getAllUsers: [User]
    getUser(id: String!): User

    getPosts(id: String!): [Post]

    getCommentsByAuthorId(id: String!): [Comment]
    getCommentsByPostId(id: String!): [Comment]
  }

  type Mutation {
    createUser(name: String!): User
    
    createPost(title: String!, contents: String!, author: AuthorInput!): Post
    updatePost(id: String!, title: String, contents: String): Post
    removePost(id: String!): Post

    createComment(contents: String!, author: AuthorInput!, postId: String!): Comment
    updateComment(id: String!, contents: String): Comment
    removeComment(id: String!): Comment
  }

  input AuthorInput {
    id: String
    name: String
  }

  type Author {
    id: String
    name: String
  }

  type User{
    _id: String
    name: String
    joined: String
    posts: [String]
    comments: [String]
  }

  type Post{
    _id: String
    author: Author
    title: String
    contents: String
    created: String
    commentsId: [String]
    commentsAuthor: [String]
  }

  type Comment{
    _id: String
    author: Author
    postId: String
    contents: String
    created: String
  }
`);

class RestWapper extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/api/';
  }

  async getAllUsers() {
    return this.get(`getUser/`);
  }

  async getUser(id) {
    return this.get(`getUser/${id}`);
  }

  async createUser(body) {
    return this.post(
      `createUser`, // path
      body, // request body
    );
  }

  async createPost(body) {
    return this.post(
      `createPost`, // path
      body, // request body
    );
  }

  async getPosts(id) {
    return this.get(`getPosts/${id}`);
  }

  async updatePost(body) {
    return this.put(
      `updatePost/${body.id}`, // path
      body, // request body
    );
  }

  async removePost(id) {
    return this.delete(
      `removePost/${id}`, // path
    );
  }

  async createComment(body) {
    return this.post(
      `createComment`, // path
      body, // request body
    );
  }

  async getCommentsByAuthorId(id) {
    return this.get(`getCommentsByAuthorId/${id}`);
  }

  async getCommentsByPostId(id) {
    return this.get(`getCommentsByPostId/${id}`);
  }

  async updateComment(body) {
    return this.put(
      `updateComment/${body.id}`, // path
      body, // request body
    );
  }

  async removeComment(id) {
    return this.delete(
      `removeComment/${id}`, // path
    );
  }
}

var restAPI = new RestWapper();
restAPI.initialize({ context:{}});

var resolver = {
  getAllUsers: async () => {
    return await restAPI.getAllUsers();
  },

  getUser: async (args) => {
    const {id} = args;
    return await restAPI.getUser(id);
  },

  createUser: async (args) => {
    const {name} = args;
    const body = {
      "name": name
    };
    return await restAPI.createUser(body);
  },

  createPost: async (args) => {
    const {author, title, contents} = args;
    const body = {
      "author": author,
      "title": title,
      "contents": contents
    };
    return await restAPI.createPost(body);
  },

  getPosts: async (args) => {
    const {id} = args;
    return await restAPI.getPosts(id);
  },

  updatePost: async (args) => {
    const {author, title, contents, id} = args;
    const body = {
      "author": author,
      "title": title,
      "contents": contents,
      "id": id
    };
    return await restAPI.updatePost(body);
  },

  removePost: async (args) => {
    const {id} = args;
    return await restAPI.removePost(id);
  },

  createComment: async (args) => {
    const {author, postId, contents} = args;
    const body = {
      "author": author,
      "postId": postId,
      "contents": contents
    };
    return await restAPI.createPost(body);
  },
  
  getCommentsByAuthorId: async (args) => {
    const {id} = args;
    return await restAPI.getCommentsByAuthorId(id);
  },

  getCommentsByPostId: async (args) => {
    const {id} = args;
    return await restAPI.getCommentsByPostId(id);    
  },

  updateComment: async (args) => {
    const {id, contents} = args;
    const body = {
      "id": id,
      "contents": contents
    };
    return await restAPI.updateComment(body);
  },

  removeComment: async (args) => {
    const {id} = args;
    return await restAPI.removeComment(id);
  },
};


module.exports = {schema: schema, root: resolver};