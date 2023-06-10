import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';
import CoverageCategoryUpdateModal from "../coverageCategory/CoverageCategoryUpdateModal";
import CoverageCategoryDeleteModal from "../coverageCategory/CoverageCategoryDeleteModal";


function CoverageCategoryDetailUpdateRemove({currentUser}) {
    const params = useParams();
    const [coverageCategoryData, setCoverageCategoryData] = useState(null);

    useEffect(() => {
        RestService.getObjectDetail(`coverage/category/${params.name}`)
        .then((coverageCategoryObject) => {
            if (coverageCategoryObject != null){
                setCoverageCategoryData(coverageCategoryObject);
            }
        })
    }, [params.name])
    return (
        <>
            <div className="card row col-8 justify-content-center bg-light rounded-0 rounded-bottom rounded-end shadow-sm p-3 m-0">
                <div className="row col-8 mb-0 pb-0 ps-0">


                </div>
                <div className="card-title mt-2">
                    <h4 className="text-center">Coverage Category Details</h4>
                </div>
                <div className="card-body row col-12 justify-content-center">
                    <div className="col-10">
                        { coverageCategoryData ? (
                            <>
                                <p>Name: {coverageCategoryData.name}</p>
                                <p>Description : {coverageCategoryData.description}</p>
                                <p>Coverages</p>
                                <ul>
                                    {coverageCategoryData.coverages.map((coverage) => (
                                        <li key={coverage.id}>{coverage.name}</li>
                                    ))}
                                </ul>



                                <div className="row col-12 justify-content-center">
                                    <button type="button" className="btn btn-primary col-3 m-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                                        Update
                                    </button>

                                    <button type="button" className="btn btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        Delete
                                    </button>
                                </div>
                                <CoverageCategoryUpdateModal coverageCategoryData={coverageCategoryData} />
                                <CoverageCategoryDeleteModal  coverageCategoryData={coverageCategoryData} />
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

export default CoverageCategoryDetailUpdateRemove;