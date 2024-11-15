import gql from 'graphql-tag';

export const ADD_CUSTOMER = gql`
  mutation CreateCustomer(
    $FullName: String,
    $FirstName: String,
    $SecondName: String,
    $LastName: String,
    $Email: String,
    $Date: String,
    $Location: String,
    $Description: String
  ) {
    CreateCustomer(
      FullName: $FullName
      FirstName: $FirstName
      SecondName: $SecondName
      LastName: $LastName
      Email: $Email
      Date: $Date
      Location: $Location
      Description: $Description
    ) {
      ID
      FullName
      FirstName
      SecondName
      LastName
      Email
      Date
      Location
      Description
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $ID: ID!,
    $FirstName: String,
    $SecondName: String,
    $LastName: String,
    $Email: String,
    $Date: String,
    $Location: String,
    $Description: String
  ) {
    UpdateCustomer(
      ID: $ID,
      FirstName: $FirstName,
      SecondName: $SecondName,
      LastName: $LastName,
      Email: $Email,
      Date: $Date,
      Location: $Location,
      Description: $Description
    ) {
      ID
      FullName
      FirstName
      SecondName
      LastName
      Email
      Date
      Location
      Description
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($ID: ID!) {
    DeleteCustomer(ID: $ID) {
      ID
    }
  }
`;