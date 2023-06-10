import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';
import * as bootstrap from 'bootstrap/dist/js/bootstrap';

import CoverageDeleteModal from "./CoverageDeleteModal";
import CoverageUpdateModal from "./CoverageUpdateModal";



function CoverageDetailUpdateRemove({currentUser}) {
  const params = useParams();
  const [coverageData, setCoverageData] = useState(null);

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })


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
                      <p>
                        Minimun Price
                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Minimum price of the coverage, the higher value between minimum price and percentage price will be the one that takes effect" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>    
                        : {coverageData.minimumPrice}</p>
                      <p>
                        Percentage Price 
                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Price of the coverage as a percentage of the car's valuation, the higher value between minimum price and percentage price will be the one that takes effect" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>    
                        : {coverageData.valuationPercentagePrice}
                      </p>
                      <p>Category: {coverageData?.coverageCategory?.name}</p>
                    <div className="row col-12 justify-content-center">
                      <button type="button" className="btn btn-primary col-3 m-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                        Update
                      </button>

                      <button type="button" className="btn btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        Delete
                      </button>
                    </div>
                      <CoverageUpdateModal currentUser={currentUser} coverageData={coverageData} />
                      <CoverageDeleteModal currentUser={currentUser} coverageData={coverageData} />
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