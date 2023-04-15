import estado from "../components/Inventarios";
import { axiosConfig } from "../configuration/axiosConfig";

// obtener las inventarios
const getInventarios = (estado) => {
    return axiosConfig.get('inventarios?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear inventario
const createInventario = (data = {}) => {
    return axiosConfig.post('inventarios',data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarInventario = (tipoId,data) => {
  return axiosConfig.put(`inventarios/${tipoId}`,data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarInventario = (tipoId) => {
  return axiosConfig.delete(`inventarios/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getInventarios,
    createInventario,
    editarInventario,
    borrarInventario
}