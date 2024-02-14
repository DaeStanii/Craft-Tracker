const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    projectTitle: String
    createdAt: String
    materials: [Material]!
    comments: [Comment]!
  }

  type Material {
    _id: ID
    materialLabel: String
    materialDetail: String
    materialAuthor: String
    createdAt: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    projects(username: String): [Project]
    project(projectId: ID!): Project
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(projectTitle: String!): Project
    addMaterial(projectId: ID!, materialLabel: String!, material: String!): Project
    addComment(projectId: ID!, commentText: String!): Project
    removeProject(projectId: ID!): Project
    removeMaterial(projectId: ID!, materialId: ID!): Project
    removeComment(projectId: ID!, commentId: ID!): Project
  }
`;

module.exports = typeDefs;
