import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RestService from '../../services/rest-service';
import { Link } from 'react-router-dom';
import CoverageCreateModal from './CoverageCreateModal';

function CoverageListCreate() {
  const [coverageList, setCoverageList] = useState([]);

  useEffect(() => {
    RestService.getObjectList('/coverage')
        .then((data) => {
          if (data != null){
            setCoverageList(data);
          }
        })
  }, [])
  return (
      <>
        <div className="row col-9 justify-content-end mb-0 pb-0 pe-0">

          <a className="btn btn-primary col-auto rounded-0 rounded-top" data-bs-toggle="modal" data-bs-target="#createCoverageModal" href="#">Add Coverages</a>

        </div>
        <div className="card row col-9 justify-content-center bg-light rounded-0 rounded-bottom rounded-start shadow-sm mt-0">
          <div className="card-title ps-2 mt-3">
            <h4>All Coverages</h4>
          </div>
          <div className="card-body px-4">
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                  <th scope="col">Minimum Price</th>
                  <th scope="col">Percentage Price</th>
                  <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {coverageList.length !== 0 ? coverageList.map((coverage) => (
                  <tr>
                    <td>{coverage.id}</td>
                    <th>
                      <Link to={`/coverage/${coverage.name}`} className="link-secondary">
                        {coverage.name}
                      </Link>
                    </th>
                    <td>{coverage.description}</td>
                      <td>{coverage.minimumPrice}</td>
                      <td>{coverage.valuationPercentagePrice}</td>
                    <td>
                      <th scope="row">
                        <Link to={`/coverage/${coverage.name}`} className="link-secondary">
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
        <CoverageCreateModal />

      </>
  )
}
export default CoverageListCreate;