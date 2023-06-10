import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';

import CoverageDeleteModal from "./CoverageDeleteModal";
import CoverageUpdateModal from "./CoverageUpdateModal";



function CoverageDetailUpdateRemove({currentUser}) {
  const params = useParams();
  const [coverageData, setCoverageData] = useState(null);

  useEffect(() => {
    RestService.getObjectDetail(`coverage/${params.name}`)
        .then((coverageObject) => {
          if (coverageObject != null){
              setCoverageData(coverageObject);
              RestService.getObjectDetail(`/coverage/category/coverage/${params.name}`)
              .then((categoryObject) => {
                if (categoryObject != null){
                    console.log(categoryObject)
                    setCoverageData((previousData) => ({...previousData, coverageCategory: categoryObject}));
                }
              })
          }
        })

  }, [params.name])
  return (
      <>

        <div className="card row col-8 justify-content-center bg-light rounded-0 rounded-bottom rounded-end shadow-sm p-3 m-0">
            <div className="row col-8 mb-0 pb-0 ps-0">


            </div>
          <div className="card-title mt-2">
            <h4 className="text-center">Coverage  Details</h4>
          </div>
          <div className="card-body row col-12 justify-content-center">
            <div className="col-10">
              { coverageData && coverageData.coverageCategory ? (
                  <>
                      <p>Name: {coverageData.name}</p>
                      <p>Description : {coverageData.description}</p>
                      <p>Minimun Price: {coverageData.minimumPrice}</p>
                      <p>Percentage Price: {coverageData.valuationPercentagePrice}</p>
                      <p>Category: {coverageData?.coverageCategory?.name}</p>
                    <div className="row col-12 justify-content-center">
                      <button type="button" className="btn btn-primary col-3 m-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                        Update
                      </button>

                      <button type="button" className="btn btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        Delete
                      </button>
                    </div>
                      <CoverageUpdateModal coverageData={coverageData} />
                      <CoverageDeleteModal coverageData={coverageData} />
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

export default CoverageDetailUpdateRemove;