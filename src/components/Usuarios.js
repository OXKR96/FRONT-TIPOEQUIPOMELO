import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createUsuario, getUsuarios, editarUsuario } from '../services/UsuarioService'
import Modal from './ui/Modal'
import ModalEdit from './ui/ModalEdit'

export default function Usuarios() {
const title= 'Usuario'
const [usuarios, setUsuarios] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [usuario, setUsuario] = useState({
  nombre: ''
})
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

const listUsuarios = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getUsuarios(query)
    console.log(data)
    setUsuarios(data)
    
    setTimeout(() => {
      setLoading(false)
    }, 500)
    
  }catch(e){
    console.log(e)
    setError(true)
    setLoading(false)
  }
}

useEffect(() => {
  listUsuarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setUsuario({
    ...usuario,
    [e.target.name]: e.target.value
  })
}

const saveUsuario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createUsuario(usuario)
    console.log(response)
    setUsuario({nombre: ''})
    listUsuarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

const closeModal = () => {
  setUsuario({nombre: ''})
  if(id)setId('')
}

const selectUsuario = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = usuarios.filter(usuario => usuario._id === evt.target.id)
  setUsuario({...tEq[0]})
}

const editUsuario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editarUsuario(id,usuario)
    console.log(response)
    setUsuario({nombre: ''})
    listUsuarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

  return (
    <>
        <ModalEdit 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          tipoEquipo={usuario}
          loadingSave={loadingSave}
          editTipoEquipo={editUsuario}
        />
        <Modal 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          tipoEquipo={usuario}
          loadingSave={loadingSave}
          saveTipoEquipo={saveUsuario}
        />
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckChecked"
            checked={query}
            onChange={changeSwitch}
          />
          <label 
            className="form-check-label" 
            htmlFor="flexSwitchCheckChecked"
          >
            Activos
          </label>
        </div>
        <button 
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
        {
          error && 
          (
            <div className="alert alert-danger" role="alert">
              Ha ocurrido un error
            </div>
          )
        }
        
        <div className='table-responsive'>
          {
            loading 
            ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            :
            (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creac.</th>
                  <th scope="col">Fecha act.</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((usuario, index) => {
                    return (
                      <tr key={usuario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(usuario.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(usuario.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td>
                          <button 
                            onClick={selectUsuario}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={usuario._id}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              </table>
            )
          }
        </div>
    </>
  )
}