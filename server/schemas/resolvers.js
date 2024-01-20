const { User, Project, Material } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

//TODO: Add Project and Material Queries
const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    //   .populate('projects');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    //   .populate('projects');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        // .populate('projects');
      }
      throw AuthenticationError;
    },
  },

  //TODO: Add Project and Material Mutations
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
   
  },
};

module.exports = resolvers;