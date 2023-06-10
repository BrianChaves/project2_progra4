import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RestService from '../../services/rest-service';
import AuthService from '../../services/auth-service';

function Register() {
    const [createErrors, setCreateErrors] = useState([]);
    const formik = useFormik({
        initialValues: {
            username: '',
            passwordHash: '',
            password2: '',
            name: '',
            phoneNumber: '',
            email: '',
            number: '',
            owner: '',
            expirationDate: '',
            securityCode: '',
            billingAddress: '',
            
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
            number: Yup.string()
                .required('Card number is required')
                .min(16, "Credit card number must be at least 16 digits")
                .max(20, "Credit card number must be at most 20 digits"),
            owner: Yup.string()
                .required('Owner is required'),
            expirationDate: Yup.string()
                .required('Expiration date is required')
                .matches(/^\d\d\/\d\d$/, "Expiration date must be in format \"mm/yy\""),
            securityCode: Yup.string()
                .required('Security code is required')
                .matches(/^\d{3}$|^\d{4}$/, "Security code must be in format \"###\" or \"####\""),
            billingAddress: Yup.string()
                .required('Billing address is required'),
        }),
        onSubmit: values => {
            AuthService.register(values)
            .then((data) => {
                setCreateErrors([]);
                window.location.replace('/login?register=true');
            })
            .catch((data) => {
                console.log(data)
                const errors = data.map((error) => ({field: error.field, message: error.defaultMessage}));
                setCreateErrors(errors);
            });
        },
    });
  return (
    <div className="card row col-8 justify-content-center bg-light shadow-sm my-5">
        <div className="card-body">
            <form className="row col-12 justify-content-center" onSubmit={formik.handleSubmit}>
                <div className="row col-6 justify-content-center border-2 border-end">
                    <h4 className="col-8 mt-3 ms-3">Profile Information</h4>
                    <div className="col-8">
                        <label htmlFor="username" className="form-label col-12 fw-bold my-auto">Username</label>
                        <input 
                            id="username" 
                            name="username" 
                            type="text"  
                            className="form-control d-inline" 
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
                    <div className="col-8">
                        <label htmlFor="passwordHash" className="form-label col-12 fw-bold my-auto">Password</label>
                        <input 
                            id="passwordHash" 
                            name="passwordHash" 
                            type="password"  
                            className="form-control d-inline" 
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
                    <div className="col-8">
                        <label htmlFor="password2" className="form-label col-12 fw-bold my-auto">Password (again)</label>
                        <input 
                            id="password2" 
                            name="password2" 
                            type="password"  
                            className="form-control d-inline"
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
                    <div className="col-8">
                        <label htmlFor="name" className="form-label col-12 fw-bold my-auto">Name</label>
                        <input 
                            id="name" 
                            name="name" 
                            type="text" 
                            className="form-control d-inline" 
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
                    <div className="col-8">
                        <label htmlFor="phoneNumber" className="form-label col-12 fw-bold my-auto">Phone Number</label>
                        <input 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            type="text" 
                            className="form-control d-inline" 
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
                    <div className="col-8">
                        <label htmlFor="email" className="form-label col-12 fw-bold my-auto">Email</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="text" 
                            className="form-control d-inline" 
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
                </div>
                <div className="row col-6 justify-content-center">
                    <h4 className="col-8 mt-3 ms-3">Payment Information</h4>
                    <div className="col-8">
                        <label htmlFor="number" className="form-label col-12 fw-bold my-auto">Card Number</label>
                        <input 
                            id="number" 
                            name="number" 
                            type="text" 
                            className="form-control d-inline" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.number}
                        />
                        {formik.touched.number && formik.errors.number && (
                        <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                            <div className="error">{formik.errors.number}</div>
                        </div>
                        )}
                        {createErrors.filter((error) => error.field === "number").length > 0 && (
                            <ul class="alert alert-danger ps-4">
                                {createErrors.filter((error) => error.field === "number").map((error)=> (
                                    <li>{error.message}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-8">
                        <label htmlFor="owner" className="form-label col-12 fw-bold my-auto">Name (In card)</label>
                        <input 
                            id="owner" 
                            name="owner" 
                            type="text" 
                            className="form-control d-inline" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.owner}
                        />
                        {formik.touched.owner && formik.errors.owner && (
                        <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                            <div className="error">{formik.errors.owner}</div>
                        </div>
                        )}
                        {createErrors.filter((error) => error.field === "owner").length > 0 && (
                            <ul class="alert alert-danger ps-4">
                                {createErrors.filter((error) => error.field === "owner").map((error)=> (
                                    <li>{error.message}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-8">
                        <label htmlFor="expirationDate" className="form-label col-12 fw-bold my-auto">Expiration Date</label>
                        <input 
                            id="expirationDate" 
                            name="expirationDate" 
                            type="text" 
                            className="form-control d-inline" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.expirationDate}
                        />
                        {formik.touched.expirationDate && formik.errors.expirationDate && (
                        <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                            <div className="error">{formik.errors.expirationDate}</div>
                        </div>
                        )}
                        {createErrors.filter((error) => error.field === "expirationDate").length > 0 && (
                            <ul class="alert alert-danger ps-4">
                                {createErrors.filter((error) => error.field === "expirationDate").map((error)=> (
                                    <li>{error.message}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-8">
                        <label htmlFor="securityCode" className="form-label col-12 fw-bold my-auto">Security Code (CVV)</label>
                        <input 
                            id="securityCode" 
                            name="securityCode" 
                            type="text" 
                            className="form-control d-inline" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.securityCode}
                        />
                        {formik.touched.securityCode && formik.errors.securityCode && (
                        <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                            <div className="error">{formik.errors.securityCode}</div>
                        </div>
                        )}
                        {createErrors.filter((error) => error.field === "securityCode").length > 0 && (
                            <ul class="alert alert-danger ps-4">
                                {createErrors.filter((error) => error.field === "securityCode").map((error)=> (
                                    <li>{error.message}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-8">
                        <label htmlFor="billingAddress" className="form-label col-12 fw-bold my-auto">Billing Address</label>
                        <textarea 
                            id="billingAddress" 
                            name="billingAddress" 
                            className="form-control d-inline" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.billingAddress}
                        >
                        </textarea>
                        {formik.touched.billingAddress && formik.errors.billingAddress && (
                        <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                            <div className="error">{formik.errors.billingAddress}</div>
                        </div>
                        )}
                        {createErrors.filter((error) => error.field === "billingAddress").length > 0 && (
                            <ul class="alert alert-danger ps-4">
                                {createErrors.filter((error) => error.field === "billingAddress").map((error)=> (
                                    <li>{error.message}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="col-12 row justify-content-center mt-3">
                    <input type="submit" className="btn btn-lg btn-primary col-5 mb-2" value="Register" />
                    <span className="col-12 text-center"> Or <Link className="link-secondary" to={"/login"}>log in</Link> if you already have an account</span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register