import React, { useEffect, useState } from 'react'
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import RestService from '../../services/rest-service';

function PaymentCreateModal() {

    const formik = useFormik({
        initialValues: {
            number: '',
            owner: '',
            expirationDate: '',
            securityCode: '',
            billingAddress: '',

        },
        validationSchema: Yup.object({
            number: Yup.string()
                .required('Number is required'),
            owner: Yup.string()
                .required('Owner is required'),
            expirationDate: Yup.string()
                .required('Expiration Date is required'),
            securityCode: Yup.string()
                .required('Security Code is required'),
            billingAddress: Yup.string()
                .required('Billing Address is Required'),
        }),
        onSubmit: values => {
            RestService.createObject('/payment', values)
                .then((data) => {
                    window.location.reload();
                })

        },
    });
    return (
        <div className="modal fade" id="createPaymentModal" tabindex="-1" aria-labelledby="createPaymentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="createPaymentModalLabel">Create Payment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">



                            <div>
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
                            </div>


                            <div className="modal-footer">
                                <input type="submit" className="btn btn-primary" value="Create Payment"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentCreateModal