import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RestService from '../../services/rest-service';
import { Link } from 'react-router-dom';
import UserCreateModal from './UserCreateModal';

function UserListCreate() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        RestService.getObjectList('/user')
        .then((data) => {
            if (data != null){
                setUserList(data);
            }
        })
    }, [])
    return (
        <>
            <div className="row col-9 justify-content-end mb-0 pb-0 pe-0">
                <a className="btn btn-primary col-auto rounded-0 rounded-top" data-bs-toggle="modal" data-bs-target="#createUserModal" href="#">Add User</a>
            </div>
            <div className="card row col-9 justify-content-center bg-light rounded-0 rounded-bottom rounded-start shadow-sm mt-0">
                <div className="card-title ps-2 mt-3">
                    <h4>All Users</h4>
                </div>
                <div className="card-body px-4">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Roles</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length !== 0 ? userList.map((user) => (
                            <tr>
                                <td>{user.id}</td>
                                <th>
                                    <Link to={`/user/${user.username}`} className="link-secondary">
                                        {user.username}
                                    </Link>
                                </th>
                                <td>{user.name}</td>
                                <td>{user.roles.map((role, index) => index === 0 ? role.name: " | " + role.name)}</td>
                                <td>
                                    <th scope="row">
                                    <Link to={`/user/${user.username}`} className="link-secondary">
                                        View Details
                                    </Link>
                                    </th>
                                </td>
                            </tr>
                            )): (
                            <tr>No users exist</tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <UserCreateModal />
        </>
    )
}

export default UserListCreate;