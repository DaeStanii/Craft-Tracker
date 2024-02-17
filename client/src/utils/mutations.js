import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectType: String!, $projectTitle: String!) {
    addProject(projectType: $projectType, projectTitle: $projectTitle) {
      _id
      projectType
      projectTitle
      projectAuthor
      createdAt
      materials {
        _id
        materialLabel
        materialDetail
      }
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_MATERIAL = gql`
  mutation addMaterial($projectId: ID!, $materialLabel: String!, $materialDetail: String!) {
    addMaterial(projectId: $projectId, materialLabel: $materialLabel, materialDetail: $materialDetail) {
      _id
      projectType
      projectTitle
      projectAuthor
      createdAt
      materials {
        _id
        materialLabel
        materialDetail
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($projectId: ID!, $commentText: String!) {
    addComment(projectId: $projectId, commentText: $commentText) {
      _id
      projectType
      projectTitle
      projectAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
      projectType
      projectTitle
      projectAuthor
      createdAt
    }
  }
`

export const REMOVE_MATERIAL = gql`
  mutation removeMaterial($projectId: ID!, $materialId: ID!) {
    removeMaterial(projectId: $projectId, materialId: $materialId) {
      _id
      projectType
      projectTitle
      projectAuthor
      createdAt
      materials {
        _id
        materialLabel
        materialDetail
        createdAt
      }
    }
  }
`

export const REMOVE_COMMENT = gql`
  mutation removeComment($projectId: ID!, $commentId: ID!) {
    removeComment(projectId: $projectId, commentId: $commentId) {
      _id
      projectType
      projectTitle
      projectAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`