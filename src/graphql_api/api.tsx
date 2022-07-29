import { gql } from "@apollo/client";

export const Question_Query = gql`
{
  allQuestions {
    id
    question
    correctAnswer
    weight
    postedBy {
      email
    }
  }     
}`;

export const LOGIN = gql`
{
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
    }
  }
}`;

// export const REGISTER = gql`
// {
//   mutation Mutation($name: String!, $email: String!, $password: String!) {
//     registerUser(name: $name, email: $email, password: $password) {
//       token
//       user {
//         id
//         name
//         email
//       }
//     }
//   }
// }`;