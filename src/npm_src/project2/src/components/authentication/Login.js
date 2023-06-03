import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/auth-service';
import { Link, useNavigate } from 'react-router-dom';

function Login({setCurrentUser, setShowAdminContent, setShowStandardContent}) {
    const [invalidError, setInvalidError] = useState(false);
    const formik = useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            AuthService.login(values.username, values.password)
            .then(() => {
                    setInvalidError(false);
                    const user = AuthService.getCurrentUser();
                    if (user) {
                        setCurrentUser(user);
                        setShowAdminContent(user.roles.includes("AdministratorClient"));
                        setShowStandardContent(user.roles.includes("StandardClient"));
                    }
                    window.location.replace('/home');
            })
            .catch((error) => {
                setInvalidError(true);
                console.log(error);
            });
        },
      });
    return (
        <div class="card row col-10 col-md-6 justify-content-center bg-light rounded-0 rounded-bottom rounded-start shadow-sm mt-0">
            <div class="row col-12 card-title justify-content-between ps-2 m-0 mt-3">
                <form onSubmit={formik.handleSubmit} className='row col-8 mx-auto'>
                    {invalidError && (
                    <div className="col-12 alert alert-danger">
                        Invalid Credentials. Login Failed.
                    </div>
                    )}
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="col-12 alert alert-danger">{formik.errors.username}</div>
                    ) : null}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="col-12 alert alert-danger">{formik.errors.password}</div>
                    ) : null}
                    <div className="col-12 row justify-content-center mt-3">
                        <input type="submit" className="btn btn-lg btn-primary col-5 mb-2" value="Log In" />
                        <span className="col-12 text-center"> Or <Link className="link-secondary" to={"/register"}>register</Link> if you don't have an account</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;