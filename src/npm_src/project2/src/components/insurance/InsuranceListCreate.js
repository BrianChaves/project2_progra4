import React, { useEffect, useState } from 'react';
import RestService from '../../services/rest-service';
import { Link } from 'react-router-dom';
import InsuranceCreateModal from './InsuranceCreateModal';

function InsuranceListCreate() {
  const [insuranceList, setInsuranceList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
      RestService.getObjectList('/insurance')
      .then((data) => {
          if (data != null){
              setInsuranceList(data);
          }
      })
  }, [])
    return (
        <>
        <div class="row col-9 justify-content-end mb-0 pb-0 pe-0">
            <a class="btn btn-primary col-auto rounded-0 rounded-top" data-bs-toggle="modal" data-bs-target="#createInsuranceModal" href="#">Add Insurance</a>
        </div>
        <div class="card row col-9 justify-content-center bg-light rounded-0 rounded-bottom rounded-start shadow-sm mt-0">
            <div class="row col-12 card-title justify-content-between ps-2 m-0 mt-3">
                <h4 class="col-5">Insurance</h4>
                <form class="row col-7">
                    <input 
                        type="text" 
                        id="search" 
                        name="search" 
                        class="form-control col-auto w-100" 
                        placeholder="Search by car number plate..."
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </form>
            </div>
            <div class="card-body px-4">
                <table class="table table-striped table-hover">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Number Plate</th>
                        <th scope="col">Date</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col"></th>
                        <th scope="col">Valuation</th>
                        <th scope="col"></th>
                    </tr>
                    <tbody>
                        {insuranceList.length !== 0 ? insuranceList.filter((insurance) => searchInput.length === 0 || insurance.numberPlate.includes(searchInput)).map((insurance) => (
                        <tr>
                            <td>{insurance.id}</td>
                            <th>
                                <Link to={`/insurance/${insurance.numberPlate}`} className="link-secondary">
                                    {insurance.numberPlate}
                                </Link>
                            </th>
                            <td>{insurance.startDate}</td>
                            <td>{insurance.vehicle.brand} {insurance.vehicle.model}</td>
                            <td>
                                <img src={`/api/vehicle/image/${insurance.vehicle.id}`} alt="" style={{width: '100px', border: '1px solid lightgray'}} />
                            </td>
                            <td>₡{insurance.valuation}</td>
                            {/* <td>{user.roles.map((role, index) => index === 0 ? role.name: " | " + role.name)}</td> */}
                            <td>
                                <th scope="row">
                                <Link to={`/insurance/${insurance.numberPlate}`} className="link-secondary">
                                    View Details
                                </Link>
                                </th>
                            </td>
                        </tr>
                        )): (
                        <tr>No insurance exist</tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <InsuranceCreateModal />
        </>
    )
}

export default InsuranceListCreate