import {
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/api",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});
export const CREATE_USUARIO = gql`
  mutation CreateUsuario($createinput: AddUsuario!) {
    createUsuario(input: $createinput) {
      nombre
      identificacion
      email
      estado
      password
      rol
    }
  }
`;
export const USUARIOS = gql`
  query {
    getUsuarios {
      _id
      identificacion
      nombre
      password
      rol
      estado
      email
    }
  }
`;
export const EDITAR_USUARIO = gql`
  mutation updateUsuario($id: ID!, $createinput: UsuarioEditInput) {
    editUsuario(_id: $id, input: $createinput) {
      _id
      estado
    }
  }
`;
// export const CONSULTAR_ID = gql`
//   query{
//     createUser($id:ID!){
//       getUsuario(id: $id){
//
//         nombre
//         dentificacion
//         email
//         estado
//       }

//     }
//  }
// `;
