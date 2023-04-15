import estado from "../components/Usuarios";
import { axiosConfig } from "../configuration/axiosConfig";

// obtener las usuarios
const getUsuarios = (estado) => {
    return axiosConfig.get('usuarios?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear usuario
const createUsuario = (data = {}) => {
    return axiosConfig.post('usuarios',data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarUsuario = (tipoId,data) => {
  return axiosConfig.put(`usuarios/${tipoId}`,data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarUsuario = (tipoId) => {
  return axiosConfig.delete(`usuarios/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getUsuarios,
    createUsuario,
    editarUsuario,
    borrarUsuario
}