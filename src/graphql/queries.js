import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
  {
    Customers {
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
