import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RestService from '../../services/rest-service';
import { Link } from 'react-router-dom';
import CoverageCategoryCreateModal from './CoverageCategoryCreateModal';

function CoverageCategoryListCreate() {
    const [coverageCategoryList, setCoverageCategoryList] = useState([]);

    useEffect(() => {
        RestService.getObjectList('/coverage/category')
            .then((data) => {
                if (data != null){
                    setCoverageCategoryList(data);
                }
            })
    }, [])
    return (
        <>
            <div className="row col-9 justify-content-end mb-0 pb-0 pe-0">

            <a className="btn btn-primary col-auto rounded-0 rounded-top" data-bs-toggle="modal" data-bs-target="#createCoverageCategoryModal" href="#">Add Categories</a>

            </div>
            <div className="card row col-9 justify-content-center bg-light rounded-0 rounded-bottom rounded-start shadow-sm mt-0">
                <div className="card-title ps-2 mt-3">
                    <h4>All Categories</h4>
                </div>
                <div className="card-body px-4">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {coverageCategoryList.length !== 0 ? coverageCategoryList.map((coverageCategory) => (
                            <tr>
                                <td>{coverageCategory.id}</td>
                                <th>
                                    <Link to={`/coverageCategory/${coverageCategory.name}`} className="link-secondary">
                                        {coverageCategory.name}
                                    </Link>
                                </th>
                                <td>{coverageCategory.description}</td>
                                <td>
                                    <th scope="row">
                                        <Link to={`/coverageCategory/${coverageCategory.name}`} className="link-secondary">
                                            View Details
                                        </Link>
                                    </th>
                                </td>
                            </tr>
                        )): (
                            <tr>No coverages exist</tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
               <CoverageCategoryCreateModal />

        </>
    )
}
export default CoverageCategoryListCreate;