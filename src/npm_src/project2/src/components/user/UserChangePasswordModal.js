import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import RestService from '../../services/rest-service';
import AuthService from '../../services/auth-service';

function UserChangePasswordModal({userData}) {
    const [createErrors, setCreateErrors] = useState([]);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            password2: ""
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
            password2: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            RestService.createObject(`/user/${userData.username}/change_password`, values)
            .then((data) => {
                setCreateErrors([]);
                AuthService.logout();
                window.location.replace('/');
            })
            .catch((data) => {
                const errors = data.map((error) => ({field: error.field, message: error.defaultMessage}));
                setCreateErrors(errors);
            })
        },
    });
    return (
        <div className="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="changePasswordModalLabel">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"><div>
                                <div>
                                    <label htmlFor="oldPassword" className="form-label mb-0 mt-3">Old Password</label>
                                    <input 
                                        id="oldPassword" 
                                        name="oldPassword" 
                                        type="password" 
                                        className="form-control" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.oldPassword}
                                    />
                                    {formik.touched.oldPassword && formik.errors.oldPassword && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.oldPassword}</div>
                                    </div>
                                    )}
                                    {createErrors.filter((error) => error.field === "oldPassword").length > 0 && (
                                        <ul class="alert alert-danger ps-4">
                                            {createErrors.filter((error) => error.field === "oldPassword").map((error)=> (
                                                <li>{error.message}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                    <label htmlFor="password" className="form-label mb-0 mt-3">Password</label>
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        className="form-control" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.password}</div>
                                    </div>
                                    )}
                                    {createErrors.filter((error) => error.field === "password").length > 0 && (
                                        <ul class="alert alert-danger ps-4">
                                            {createErrors.filter((error) => error.field === "password").map((error)=> (
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
                        </div>
                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary" value="Change Password" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserChangePasswordModal