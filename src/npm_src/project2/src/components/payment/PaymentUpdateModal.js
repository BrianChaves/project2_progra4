import React, {useEffect, useState} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import RestService from '../../services/rest-service';

function PaymentUpdateModal({ paymentData}) {
    const [createErrors, setCreateErrors] = useState([]);
    const [error, setError] = useState("");


    const formik = useFormik({
        initialValues: {
            number: paymentData.number,
            owner: paymentData.owner,
            expirationDate: paymentData.expirationDate,
            securityCode: paymentData.securityCode,
            billingAddress: paymentData.billingAddress,
        },
        validationSchema: Yup.object({
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
            RestService.updateObject(`/payment/${paymentData.number}`, values)
                .then((data) => {
                    console.log(data);
                    setCreateErrors([]);
                    window.location.replace('/payment/');
                })
                .catch((data) => {
                    if (Array.isArray(data)){
                        const errors = data.map((error) => ({field: error.field, message: error.defaultMessage}));
                        setCreateErrors(errors);
                    }
                    else{
                        setError(data);
                    }
                })
        },
    });
    return (
        <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Update Payment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <div>
                                {error && (
                                    <ul class="alert alert-danger ps-4">
                                        <li>{error}</li>
                                    </ul>
                                )}
                                <label htmlFor="number" className="form-label mb-0 mt-3">Card Number:</label>
                                <input
                                    id="number"
                                    name="number"
                                    type="text"
                                    className="form-control"
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
                                    <ul className="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "number").map((error) => (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="owner" className="form-label mb-0 mt-3">Card Name</label>
                                <input
                                    id="owner"
                                    name="owner"
                                    type="text"
                                    className="form-control"
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
                                    <ul className="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "owner").map((error) => (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="expirationDate" className="form-label mb-0 mt-3">Expiration Date</label>
                                <input
                                    id="expirationDate"
                                    name="expirationDate"
                                    type="text"
                                    className="form-control"
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
                                    <ul className="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "expirationDate").map((error) => (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="securityCode" className="form-label mb-0 mt-3">Security Code </label>
                                <input
                                    id="securityCode"
                                    name="securityCode"
                                    type="text"
                                    className="form-control"
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
                                    <ul className="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "securityCode").map((error) => (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div>
                                <label htmlFor="billingAddress" className="form-label mb-0 mt-3">Billing Address </label>
                                <input
                                    id="billingAddress"
                                    name="billingAddress"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.billingAddress}
                                />
                                {formik.touched.billingAddress && formik.errors.billingAddress && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.billingAddress}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "billingAddress").length > 0 && (
                                    <ul className="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "billingAddress").map((error) => (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>


                        </div>

                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary" value="Update Payment" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentUpdateModal