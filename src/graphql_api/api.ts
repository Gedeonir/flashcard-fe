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

export const SINGLE_Question_Query = gql`
  query GetSingleQuestion($getSingleQuestionId: Int!) {
    getSingleQuestion(id: $getSingleQuestionId) {
      id
      question
      correctAnswer
      weight
    }
  }`;

export const LOGIN_MUTATION = gql`
  mutation Login(
    $email: String!, 
    $password: String!
    ) {
      login(email: $email, password: $password) {
        token
    }
  }`;

export const REGISTER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      token
    }
  }`;


export const POST_QUESTION = gql`
  mutation PostQuestion($question: String!, $correctAnswer: String!, $weight: String!) {
      postQuestion(question: $question, correctAnswer: $correctAnswer, weight: $weight) {
        id
        question
        correctAnswer
        weight
      }
    }`;

export const DELETE_QUESTION =gql`
mutation DeleteQuestion($deleteQuestionId: Int!) {
  deleteQuestion(id: $deleteQuestionId) {
    id
    question
    correctAnswer
    weight
    postedBy {
      email
    }
  }
}`

export const UPDATE_QUESTION = gql`
mutation UpdateQuestion($updateQuestionId: Int!, $question: String!, $correctAnswer: String!, $weight: String!) {
  updateQuestion(id: $updateQuestionId, question: $question, correctAnswer: $correctAnswer, weight: $weight) {
    id
    question
    correctAnswer
    weight
    postedBy {
      email
    }
  }
}`