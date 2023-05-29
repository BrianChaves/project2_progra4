import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestService from '../../services/rest-service';
import UserUpdateModal from './UserUpdateModal';
import UserDeleteModal from './UserDeleteModal';
import UserChangePasswordModal from './UserChangePasswordModal';

function UserDetailUpdateRemove({currentUser, showAdminContent, showStandardContent}) {
    const params = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        RestService.getObjectDetail(`user/${params.username}`)
        .then((userObject) => {
            if (userObject != null){
                setUserData(userObject);
            }
        })
        .then(() => {
            RestService.getObjectList(`/insurance/user/${params.username}`)
            .then((insuranceList) => {
                if (insuranceList != null){
                    setUserData((previousUserData) => ({
                        ...previousUserData,
                        insurances: insuranceList
                    }));
                }
            })
        })
    }, [params.username])
    return (
        <>
        { showAdminContent && (
        <div className="row col-8 mb-0 pb-0 ps-0">
            <Link className="btn btn-secondary col-auto rounded-0 rounded-top" to={"/user"}>All Users</Link>
        </div>
        )}
        { showStandardContent && (
        <div className="row col-8 mb-0 pb-0 ps-0">
            <Link className="btn btn-secondary col-auto rounded-0 rounded-top" to={"/home"}>Dashboard</Link>
        </div>
        )}
        <div className="card row col-8 justify-content-center bg-light rounded-0 rounded-bottom rounded-end shadow-sm p-3 m-0">
            <div className="card-title mt-2">
                <h4 className="text-center">User Details</h4>
            </div>
            <div className="card-body row col-12 justify-content-center">
                <div className="col-10">
                { userData ? (
                    <>
                    <p>Username: {userData.username}</p>
                    <p>Name: {userData.name}</p>
                    <p>Phone Number: {userData.phoneNumber}</p>
                    <p>Email: {userData.email}</p>
                    { 
                        userData.roles?.length > 0
                        ? (
                            <>
                            <p>Roles:</p>
                            <ul>
                                {userData.roles?.map(role => <li>{role.name}</li>)}
                            </ul>
                            </>
                        ) : (
                            <p>Roles: No roles assigned.</p>
                        )
                    }
                    <div>
                    { 
                        userData.payments?.length > 0
                        ? (
                            <>
                            <p>Payments:</p>
                            <ul>
                                {userData.payments?.map(payment => (
                                    <div className="ps-2">
                                        <span>Owner: {payment.owner} | </span>
                                        <span>Card Number: {payment.safeNumber} | </span>
                                        <span>Expiration Date: {payment.expirationDate}</span>
                                        <div>Billing Address:</div>
                                        <div className="ps-3">{payment.billingAddress}</div>
                                        <hr/>
                                    </div>
                                ))}
                            </ul>
                            </>
                        ) : (
                            <p>Payments: No payments assigned.</p>
                        )
                    }
                    </div>
                    <div>
                    { 
                        userData.insurances?.length > 0
                        ? (
                            <>
                            <p>Acquired Insurances:</p>
                            <ul>
                            {userData.insurances?.map(insurance => (
                                <div className="ps-2">
                                    <p>Car Details</p>
                                    <div className="ps-2">
                                        <div>Number Plate: {insurance.numberPlate}</div>
                                        <div>Model: {insurance.carYear} {insurance.vehicle?.brand} {insurance.vehicle?.model}</div>
                                        <div>Valuation: {insurance.valuation}</div>
                                        <div>Payment Schedule: {insurance.paymentSchedule?.name}</div>
                                        <div>Payment Method: {insurance.payment?.safeNumber} + ({insurance.payment?.owner})</div>
                                    </div>
                                    <p>Acquired Coverages</p>
                                    <ul>
                                    {insurance.coverages?.map(coverage => (
                                        <li>{coverage.name}</li>
                                    ))}
                                    </ul>
                                    <hr/>
                                </div>
                            ))}
                            </ul>
                            </>
                        ) : (
                            <p>Acquired Insurances: None.</p>
                        )
                    }
                    </div>
                    <div className="row col-12 justify-content-center">
                            <button type="button" className="btn btn-primary col-3 m-2" data-bs-toggle="modal" data-bs-target="#updateModal">
                                Update
                            </button>
                            {params.username === currentUser.username && (
                            <button type="button" className="btn btn-secondary col-3 m-2" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                                Change Password
                            </button>
                            )}
                            <button type="button" className="btn btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                Delete
                            </button>
                    </div>
                    <UserUpdateModal currentUser={currentUser} userData={userData} />
                    <UserChangePasswordModal userData={userData} />
                    <UserDeleteModal currentUser={currentUser} userData={userData} />
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

export default UserDetailUpdateRemove;