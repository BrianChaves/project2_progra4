import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RestService from '../../services/rest-service';
import { Link } from 'react-router-dom';
import PaymentCreateModal from './PaymentCreateModal';

function PaymentListCreate() {
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    RestService.getObjectList('/payment')
        .then((data) => {
          if (data != null){
            setPaymentList(data);
          }
        })
  }, [])
  return (
      <>
        <div className="row col-9 justify-content-end mb-0 pb-0 pe-0">

          <a className="btn btn-primary col-auto rounded-0 rounded-top" data-bs-toggle="modal" data-bs-target="#createPaymentModal" href="#">Add Payment</a>

        </div>
        <div className="card row col-9 justify-content-center bg-light rounded-0 rounded-bottom rounded-start shadow-sm mt-0">
          <div className="card-title ps-2 mt-3">
            <h4>All Payment</h4>
          </div>
          <div className="card-body px-4">
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Number</th>
                <th scope="col">Owner</th>
                <th scope="col">Expiration Date</th>
                  <th scope="col">Billing Address</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {paymentList.length !== 0 ? paymentList.map((payment) => (
                  <tr>
                    <td>{payment.id}</td>
                    <th>
                      <Link to={`/payment/${payment.number}`} className="link-secondary">
                        {payment.number}
                      </Link>
                    </th>
                    <td>{payment.owner}</td>
                    <td>{payment.expirationDate}</td>
                    <td>{payment.billingAddress}</td>
                    <td>
                      <th scope="row">
                        <Link to={`/payment/${payment.number}`} className="link-secondary">
                          View Details
                        </Link>
                      </th>
                    </td>
                  </tr>
              )): (
                  <tr>No categories exist</tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <PaymentCreateModal />

      </>
  )
}
export default PaymentListCreate;