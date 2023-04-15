import { axiosConfig } from "../configuration/axiosConfig";

// obtener los estados
const getEstados = (estado) => {
    return axiosConfig.get('Estados?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear estado
const createEstado = (data = {}) => {
    return axiosConfig.post('Estados', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarEstado = (tipoId, data) => {
  return axiosConfig.put(`Estados/${tipoId}`, data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarEstado = (tipoId) => {
  return axiosConfig.delete(`estados/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getEstados,
    createEstado,
    editarEstado,
    borrarEstado
}