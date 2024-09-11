import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      name
      profilePicture
      #user and transactions are joined in the same query ( relationships )
      transactions {
        _id
        amount
        category
        date
        description
        location
        paymentType
      }
    }
  }
`;
