import estado from "../components/Marcas";
import { axiosConfig } from "../configuration/axiosConfig";

// obtener las marcas
const getMarcas = (estado) => {
    return axiosConfig.get('Marcas?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear marca
const createMarca = (data = {}) => {
    return axiosConfig.post('Marcas',data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarMarca = (tipoId,data) => {
  return axiosConfig.put(`marcas/${tipoId}`,data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarMarca = (tipoId) => {
  return axiosConfig.delete(`marcas/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getMarcas,
    createMarca,
    editarMarca,
    borrarMarca
}