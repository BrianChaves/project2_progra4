import React, { useState } from 'react'
import RestService from '../../services/rest-service';

function VehicleDeleteModal({vehicleData}) {
  const [deleteError, setDeleteError] = useState("");
  const deleteVehicle = (event) => {
      event.preventDefault();
      RestService.deleteObject(`vehicle/${vehicleData.id}/delete`)
      .then((data) => {
          setDeleteError("");
          window.location.replace('/vehicle');
      })
      .catch((data) => {
          setDeleteError(data);
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
                      {deleteError && (
                          <ul class="alert alert-danger ps-4">
                            <li>{deleteError}</li>
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