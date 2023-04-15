import React from 'react'
import Inventarios from '../Inventarios'

export default function ModalInventario({
    title,
    closeModal,
    handleChange,
    tipoEquipo,
    loadingSave,
    saveTipoEquipo,
    tiposEquipos,
    handleChangeSelects
}) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo {title}</h1>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Serial:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="serial"
                onChange={handleChange}
                value={tipoEquipo.serial}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Modelo:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="modelo"
                onChange={handleChange}
                value={tipoEquipo.modelo}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Descripcion:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="descripcion"
                onChange={handleChange}
                value={tipoEquipo.decripcion}
              />
            </div>

            
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Foto:
              </label>
              <input 
                type="file" 
                className="form-control" 
                id="formFile"
                name="foto"
                onChange={handleChange}
                value={tipoEquipo.foto}
              />
            </div>

              
            <div className="mb-3">
            <label for="exampleColorInput" 
            className="form-label">Selecciona Color</label>
            <input type="color" 
            className="form-control form-control-color"
             id="exampleColorInput" 
             value="#563d7c" 
             title="foto"
             onChange={handleChange}
          
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Fecha Compra:
              </label>
              <input 
                type="date" 
                className="form-control" 
                id="recipient-name"
                name="fechaCompra"
                onChange={handleChange}
                value={tipoEquipo.fechaCompra}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Precio:
              </label>
              <input 
                type="number" 
                className="form-control" 
                id="recipient-name"
                name="Precio"
                onChange={handleChange}
                value={tipoEquipo.precio}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Usuario:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="usuario"
                onChange={handleChange}
                value={''}
              />
            </div>

                   
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Marca:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="marca"
                onChange={handleChange}
                value={''}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Estado:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="estado"
                onChange={handleChange}
                value={''}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Tipo:
              </label>
              <select 
                    className="form-control" 

                    id="status"
                    name="tipoEquipo"
                    onChange={handleChangeSelects}

                >
                  {
                    tiposEquipos.map(t => {
                      return (
                        <option value={t._id}>{t.nombre}</option>
                      )
                    })
                  }
               
              </select>

            </div>






          </form>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-dismiss="modal"
            onClick={closeModal}
          >
            Cerrar
          </button>
          {
            loadingSave 
            ? 
            (
            <button 
              className="btn btn-primary" 
              type="button" disabled
            >
              <span 
                className="spinner-grow spinner-grow-sm" 
                role="status" 
                aria-hidden="true"
              >
              </span>
                Guardando...
            </button>
            ) : 
            (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={saveTipoEquipo}
              
            >
            Enviar
            </button>
            )
          }
        </div>
      </div>
    </div>
  </div>
  )
}