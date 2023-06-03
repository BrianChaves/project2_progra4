import React, { useEffect, useState } from 'react'
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import RestService from '../../services/rest-service';

function UserCreateModal() {
    const [roleList, setRoleList] = useState([]);
    const [createErrors, setCreateErrors] = useState([]);

    useEffect(() => {
        RestService.getObjectList('/role')
        .then((data) => {
            if (data != null){
                setRoleList(data);
            }
        })
    }, [])
    
    const formik = useFormik({
        initialValues: {
            username: '',
            passwordHash: '',
            password2: '',
            name: '',
            phoneNumber: '',
            email: '',
            role: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            passwordHash: Yup.string()
                .required('Password is required'),
            password2: Yup.string()
                .required('Password confirmation is required'),
            name: Yup.string()
                .required('Name is required'),
            phoneNumber: Yup.string(),
            email: Yup.string(),
            role: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            RestService.createObject('user', values)
            .then((data) => {
                setCreateErrors([]);
                window.location.reload();
            })
            .catch((data) => {
                const errors = data.map((error) => ({field: error.field, message: error.defaultMessage}));
                setCreateErrors(errors);
            })
        },
    });
    return (
        <div className="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="createUserModalLabel">Create User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="username" className="form-label mb-0 mt-3">Username</label>
                                <input 
                                    id="username" 
                                    name="username" 
                                    type="text"  
                                    className="form-control" 
                                    autoComplete={"off"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                />
                                {formik.touched.username && formik.errors.username && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.username}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "username").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "username").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="passwordHash" className="form-label mb-0 mt-3">Password</label>
                                <input 
                                    id="passwordHash" 
                                    name="passwordHash" 
                                    type="password"  
                                    className="form-control" 
                                    autoComplete={"off"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordHash}
                                />
                                {formik.touched.passwordHash && formik.errors.passwordHash && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.passwordHash}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "passwordHash").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "passwordHash").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password2" className="form-label mb-0 mt-3">Password (again)</label>
                                <input 
                                    id="password2" 
                                    name="password2" 
                                    type="password"  
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password2}
                                />
                                {formik.touched.password2 && formik.errors.password2 && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.password2}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "password2").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "password2").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="name" className="form-label mb-0 mt-3">Name</label>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="text" 
                                    className="form-control" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.name}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "name").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "name").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="form-label mb-0 mt-3">Phone Number</label>
                                <input 
                                    id="phoneNumber" 
                                    name="phoneNumber" 
                                    type="text" 
                                    className="form-control" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phoneNumber}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.phoneNumber}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "phoneNumber").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "phoneNumber").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="form-label mb-0 mt-3">Email</label>
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="text" 
                                    className="form-control" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.email}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "email").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "email").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="role" className="form-label mb-0 mt-3">Role: </label>
                                { roleList.length !== 0 ? (
                                <select 
                                    id="role" 
                                    name="role" 
                                    className="form-select form-select-sm" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.role}
                                >
                                    {roleList.map((role) => <option value={role.name}>{role.name}</option>)}
                                </select>
                                ) : (
                                    <p>No roles exist.</p>
                                )}
                                {formik.touched.role && formik.errors.role && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.role}</div>
                                </div>
                                )}
                                {createErrors.filter((error) => error.field === "role").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "role").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="modal-footer">
                                <input type="submit" className="btn btn-primary" value="Create User" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserCreateModal