import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';

import PaymentUpdateModal from "./PaymentUpdateModal";
import PaymentDeleteModal from "./PaymentDeleteModal";




function PaymentDetailUpdateRemove({currentUser}) {
  const params = useParams();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    RestService.getObjectDetail(`payment/${params.id}`)
        .then((paymentObject) => {
          if (paymentObject != null){
            setPaymentData(paymentObject);
          }
        })

  }, [params.id])
  return (
      <>

        <div className="card row col-8 justify-content-center bg-light rounded-0 rounded-bottom rounded-end shadow-sm p-3 m-0">
          <div className="row col-8 mb-0 pb-0 ps-0">


          </div>
          <div className="card-title mt-2">
            <h4 className="text-center">Payment  Details</h4>
          </div>
          <div className="card-body row col-12 justify-content-center">
              <div className="col-10">
                  { paymentData ? (
                      <>
                          <p>Number: {paymentData.safeNumber}</p>
                          <p>Owner : {paymentData.owner}</p>
                          <p>Expiration Date: {paymentData.expirationDate}</p>
                          <p>Billing Address: {paymentData.billingAddress}</p>


                          <div className="row col-12 justify-content-center">
                              <button type="button" className="btn btn-primary col-3 m-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                                  Update
                              </button>

                              <button type="button" className="btn btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                  Delete
                              </button>
                          </div>
                          <PaymentUpdateModal paymentData={paymentData} />
                          <PaymentDeleteModal   paymentData={paymentData} />
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

export default PaymentDetailUpdateRemove;