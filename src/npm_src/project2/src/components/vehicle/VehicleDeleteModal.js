import React, { useState } from 'react'
import RestService from '../../services/rest-service';

function VehicleDeleteModal({vehicleData}) {
  const [createErrors, setCreateErrors] = useState([]);
  const deleteVehicle = (event) => {
      event.preventDefault();
      RestService.deleteObject(`vehicle/${vehicleData.id}/delete`)
      .then((data) => {
          console.log(data);
          window.location.replace('/vehicle');
      })
      .catch((data) => {
          const errors = data.map((error) => ({field: error.field, message: error.defaultMessage}));
          setCreateErrors(errors);
      })
  }
  return (
      <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="deleteModalLabel">Delete Vehicle</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <h5>Are you sure you want to delete vehicle "{vehicleData.brand} {vehicleData.model}"?</h5>
                      {createErrors.filter((error) => error.field === "vehicle").length > 0 && (
                          <ul class="alert alert-danger ps-4">
                              {createErrors.filter((error) => error.field === "vehicle").map((error)=> (
                                  <li>{error.message}</li>
                              ))}
                          </ul>
                      )}
                  </div>
                  <div className="modal-footer">
                      <form onSubmit={deleteVehicle}>
                          <button type="submit" className="btn btn-danger">Delete</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default VehicleDeleteModal