import { gql } from "@apollo/client/core";

export const GET_PERFUMES = gql`
  query MyQuery {
    perfumes_perfumes {
      id
      nombre
      equivalente
      descripcion
      imagen_url
      disponible
    }
    perfumes_presentaciones {
      id
      precio_venta
      tipo_envase
      volumen_ml
    }
  }
`;
