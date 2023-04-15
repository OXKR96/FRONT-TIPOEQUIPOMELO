import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createInventario, getInventarios, editarInventario } from '../services/InventarioService'
import ModalEditInventario from './ui/ModalEditInventario'
import ModalInventario from './ui/ModalInventario'
import {  getTipoEquipos } from '../services/TipoEquipoService'
import {  getEstados } from '../services/EstadoService'
import {getMarcas} from '../services/MarcaService'
import {getUsuarios} from  '../services/UsuarioService'

export default function Inventarios() {
const title= 'Inventario'
const [Inventarios, setInventarios] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [Inventario, setInventario] = useState({
  nombre: '',
   serial:'',
   modelo:'',
   descripcion:'',
   foto:'',
   color:'',
  FechaCompra:'',
  precio:'',
  usuario:{_id:'',nombre:''},
  marca:{_id:'',nombre:''},
  estado:
{_id:'',nombre:''},
  tipoEquipo:{_id:'',nombre:''},
})
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

//busca los tipos equipos paara mapearlos en el modal 
const [tiposEquipos, setTiposEquipos] = useState([])

const listTipoEquipos = async () => {
  try{
    
    const { data } = await getTipoEquipos(true)
    console.log(data)
    setTiposEquipos(data)
  }catch(e){
    console.log(e)
  }
}

useEffect(() => {
  listTipoEquipos()
}, [])

//busca los estados para mapearlos y pasarlos al modal
const [esta, setEstados] = useState([])

const listEstados = async () => {
  try{
    
    const { data } = await getEstados(true)
    console.log(data)
    setEstados(data)
  }catch(e){
    console.log(e)
  }
}

useEffect(() => {
  listEstados()
}, [])

//busca los estados para mapearlos y pasarlos al modal
const [marca, setMarca] = useState([])

const listMarca = async () => {
  try{
    
    const { data } = await getMarcas(true)
    console.log(data)
    setMarca(data)
  }catch(e){
    console.log(e)
  }
}

useEffect(() => {
  listMarca()
}, [])

//busca los usuarios para mapearlos y pasarlos al modal
const [usu, setUsuario] = useState([])

const listUsuario = async () => {
  try{
    
    const { data } = await getUsuarios(true)
    console.log(data)
    setUsuario(data)
  }catch(e){
    console.log(e)
  }
}

useEffect(() => {
  listUsuario()
}, [])



const listInventarios = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getInventarios(query)
    console.log(data)
    setInventarios(data)

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
  listInventarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  console.log(e.target.value)
  setInventario({
    ...Inventario,
    [e.target.name]: e.target.value 
  })
}

const handleChangeSelects = (e) => {
  console.log(e.target.value)
  setInventario({
    ...Inventario, [e.target.name]:{
      _id:  e.target.value 
    }
  })
}

const saveInventario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createInventario(Inventario)
    console.log(response)
    setInventario(Inventario)
    listInventarios()
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
  setInventario({Inventario})
  
  if(id)setId('')
}

const selectInventario = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = Inventarios.filter(Inventario => Inventario._id === evt.target.id)
  setInventario({...tEq[0]})
}

const editInventario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editarInventario(id,Inventario)
    console.log(response)
    setInventario({nombre:''})
    listInventarios()
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
        <ModalEditInventario
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          tipoEquipo={Inventario}
          loadingSave={loadingSave}
          editTipoEquipo={editInventario}
        />
        <ModalInventario
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          tipoEquipo={Inventario}
          loadingSave={loadingSave}
          saveTipoEquipo={saveInventario}
          tiposEquipos={tiposEquipos}
          tiposEstados={esta}
          tiposMarcas={marca}
          tiposUsu={usu}
          handleChangeSelects={handleChangeSelects}
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
                  <th scope="col">Serial</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Fecha creac.</th>
              
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  Inventarios.map((i, index) => {
                    return (
                      <tr key={i._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{i._id}</td>
                        <td>{i.modelo}</td>
                        <td>{i.descripcion}</td>
                        <td>{}</td>
                        <td>{i.tipoEquipo.nombre}</td>
                        <td>{dayjs(i.fechaCreacion).format('YYYY-MM-DD')}</td>
                        
                        <td>
                          <button 
                            onClick={selectInventario}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={Inventario._id}
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