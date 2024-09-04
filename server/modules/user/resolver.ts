import { Resolvers } from "../../types/resolver.types";

const userResolver: Resolvers = {
  Query: {
    users: () => [],
    user: (parent, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {
    signUp: (parent, { input }) => {},
  },
};

export default userResolver;
