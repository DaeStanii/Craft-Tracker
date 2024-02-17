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
  mutation addProject($projectTitle: String!) {
    addProject(projectTitle: $projectTitle) {
      _id
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