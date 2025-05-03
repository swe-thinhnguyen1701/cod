import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation addMessage($email: String!, $name: String!, $message: String!, $recaptchaToken: String!) {
    addMessage(email: $email, name: $name, message: $message, recaptchaToken: $recaptchaToken) {
      response {
        code
        success
        message
      }
    }
  }
`;
