import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';
import * as bootstrap from 'bootstrap/dist/js/bootstrap';

function InsuranceDetailUpdateRemove({currentUser, showAdminContent, showStandardContent}) {
  const params = useParams();
  const [insuranceData, setInsuranceData] = useState(null);

  useEffect(() => {
      RestService.getObjectDetail(`insurance/${params.numberPlate}`)
      .then((insuranceObject) => {
          if (insuranceObject != null){
              setInsuranceData(insuranceObject);
          }
      })
  }, [params.numberPlate])

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })

  return (
      <>
      <div className="row col-8 mb-0 pb-0 ps-0">
          <Link className="btn btn-secondary col-auto rounded-0 rounded-top" to={"/"}>All Insurances</Link>
      </div>
      <div className="card row col-8 justify-content-center bg-light rounded-0 rounded-bottom rounded-end shadow-sm p-3 m-0">
          <div className="card-title mt-2 text-center">
              <h4>Insurance Details</h4>
              {insuranceData && (<img src={`/api/vehicle/image/${insuranceData.vehicle.id}`} alt="" style={{width: '100px', border: '1px solid lightgray'}} />)}
          </div>
          <div className="card-body row col-12 justify-content-center">
              <div className="col-10">
              { insuranceData ? (
                  <>
                  <h5>Car Information</h5>
                  <div class="ps-3">
                    <p>Number Plate: {insuranceData.numberPlate}</p>
                    <p>Car Model: {insuranceData.carYear} {insuranceData.vehicle.brand} {insuranceData.vehicle.model}</p>
                    <p>Current Value: {insuranceData.valuation}</p>
                  </div>
                  <hr/>
                  <h5>Payment:</h5>
                  <div class="ps-3">
                    <p>Card: {insuranceData.payment.safeNumber} ({insuranceData.payment.owner})</p>
                    <p>Billing Address: {insuranceData.payment.billingAddress}</p>
                    <p>Payment Plan: {insuranceData.paymentSchedule.name}</p>
                  </div>
                  <hr/>
                  { 
                      insuranceData.coverages?.length > 0
                      ? (
                          <>
                          <p>Acquired Coverages:</p>
                          <ul>
                              {insuranceData.coverages?.map(coverage => (
                              <li>
                                {coverage.name}
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title={coverage.description} class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>
                              </li>))}
                          </ul>
                          </>
                      ) : (
                          <p>Coverages: None acquired.</p>
                      )
                  }
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

export default InsuranceDetailUpdateRemove