import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const apolloClient = new ApolloClient({
  uri: 'https://darling-woodcock-91.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'wevYFfamHsMAHI4Qt0lx3S5Aw8qQLbw92s6hHR0Wt6JtXkp97etxGBtrulhJIBFx'
  }
});
