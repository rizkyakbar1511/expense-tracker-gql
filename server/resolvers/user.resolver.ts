import { users } from "../data/dummy.js";

const userResolver = {
  Query: {
    users: () => users,
    user: (parent, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
