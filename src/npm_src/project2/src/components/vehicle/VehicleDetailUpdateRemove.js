import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';
import * as bootstrap from 'bootstrap/dist/js/bootstrap';
import VehicleUpdateModal from './VehicleUpdateModal';
import VehicleDeleteModal from './VehicleDeleteModal';

function VehicleDetailUpdateRemove({currentUser, showAdminContent, showStandardContent}) {
  const params = useParams();
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
      RestService.getObjectDetail(`vehicle/${params.id}`)
      .then((vehicleObject) => {
          if (vehicleObject != null){
              setVehicleData(vehicleObject);
          }
      })
  }, [params.id])

  return (
    <>
    <div className="row col-8 mb-0 pb-0 ps-0">
        <Link className="btn btn-secondary col-auto rounded-0 rounded-top" to={"/vehicle"}>All Vehicles</Link>
    </div>
    <div className="card row col-8 justify-content-center bg-light rounded-0 rounded-bottom rounded-end shadow-sm p-3 m-0">
        <div className="card-title mt-2 text-center">
            <h4>Vehicle Details</h4>
            {vehicleData && (<img src={`/api/vehicle/image/${vehicleData.id}`} alt="" style={{width: '100px', border: '1px solid lightgray'}} />)}
        </div>
        <div className="card-body row col-12 justify-content-center">
            <div className="col-10">
            { vehicleData ? (
                <>
                <div className='row col-12'>
                  <p>Brand: {vehicleData.brand}</p>
                  <p>Model: {vehicleData.model}</p>
                </div>
                <div className="row col-12 justify-content-center">
                        <button type="button" className="btn btn-primary col-3 m-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                            Update
                        </button>
                        <button type="button" className="btn btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            Delete
                        </button>
                </div>
                <VehicleUpdateModal vehicleData={vehicleData} />
                <VehicleDeleteModal vehicleData={vehicleData} />
                </>
            ): (
                <p>Loading...</p>
            )}
            </div>
        </div>
    </div>
    </>
  )
}

export default VehicleDetailUpdateRemove