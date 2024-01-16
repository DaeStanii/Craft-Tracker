const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]
  }

  type Project {
    _id: ID
    projectTitle: String
    createdAt: String
    materials: [Material]
  }

  type Material {
    _id: ID
    materialLabel: String
    material: String
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
    removeProject(projectId: ID!): Project
    removeMaterial(projectId: ID!, materialId: ID!): Project
  }
`;

module.exports = typeDefs;
