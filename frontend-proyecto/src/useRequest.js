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
      nombre
      identificacion
      email
    }
  }
`;
export const CONSULTAR_ID = gql`
  query createUser($id: ID!) {
    getUsuario(id: $id) {
      _id
      nombre
      identificacion
      email
      estado
    }
  }
`;

export const LISTAR_PROYECTOS = gql`
  query {
    getProyectos {
      _id
      nombre_proyecto
      objetivos_generales
      objetivos_especificos
      presupuesto
      fecha_inicio
      fecha_fin
      lideres {
        documento
        nombre
      }
      inscripciones {
        documento
        nombre
        estado_inscripcion
        fecha_ingreso
        fecha_egreso
      }
      avances {
        documento
        fecha_avances
        descripcion
        observaciones
      }
      estado_proyecto
      fase_proyecto
    }
  }
`;

export const ADD_ESTUDIANTE = gql`
  mutation addNewInscripcion(
    $createInput: ProyectoAddInscripciones
    $proyectoid: ID!
    $usuarioid: ID!
  ) {
    addEstuadiante(
      input: $createInput
      proyectoId: $proyectoid
      usuarioId: $usuarioid
    ) {
      inscripciones {
        documento
        nombre
      }
    }
  }
`;
export const REGISTER_PROYECTO = gql`
  mutation addNewInscripcion($createInput: ProyectoInput!) {
    createProyecto(input: $createInput) {
      _id
      nombre_proyecto
      objetivos_generales
      objetivos_especificos
      presupuesto
      fecha_inicio
      fecha_fin
      lideres {
        nombre
        documento
      }
      estado_proyecto
      fase_proyecto
    }
  }
`;
export const EDIT_PROYECTO = gql`
  mutation updateProject($id: ID!, $updateInput: ProyectoEditInput) {
    editProyecto(_id: $id, input: $updateInput) {
      _id
      estado_proyecto
      fase_proyecto
    }
  }
`;
