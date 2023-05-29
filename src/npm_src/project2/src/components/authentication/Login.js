import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div className="col-12 alert alert-danger">{formik.errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
            {invalidError && (
            <div className="col-12 alert alert-danger">
                Invalid Credentials. Login Failed.
            </div>
            )}
        </form>
    )
}

export default Login;