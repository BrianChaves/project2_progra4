import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import RestService from '../../services/rest-service';

function UserUpdateModal({currentUser, userData}) {
    
    const formik = useFormik({
        initialValues: {
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            email: userData.email
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            phoneNumber: Yup.string(),
            email: Yup.string()
                .email(),
        }),
        onSubmit: values => {
            RestService.updateObject(`/user/${userData.username}`, values)
            .then((data) => {
                console.log(data);
                window.location.replace('/home');
            })
        },
    });
    return (
        <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">Update User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
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
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="submit" className="btn btn-primary" value="Update User" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default UserUpdateModal