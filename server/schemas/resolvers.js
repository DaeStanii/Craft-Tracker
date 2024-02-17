const { User, Project } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("projects");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("projects");
    },
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params).sort({ createdAt: -1 });
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("projects");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addProject: async (parent, { projectTitle }, context) => {
      if (context.user) {
        const project = await Project.create({
          projectTitle,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );

        return project;
      }
      throw AuthenticationError;
    },
    addMaterial: async (parent, { projectId, materialLabel, materialDetail }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              materials: { materialLabel, materialDetail },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { projectId, commentText }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: project._id } }
        );

        return project;
      }
      throw AuthenticationError;
    },
    removeMaterial: async (parent, { projectId, materialId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              materials: {
                _id: materialId,
                materialAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { projectId, commentId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
