import React, { useEffect, useState } from 'react'
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import RestService from '../../services/rest-service';

function CoverageCreateModal() {
    const [coverageCategoryCreate, setCoverageCategoryList] = useState([]);
    const [createErrors, setCreateErrors] = useState([]);

  //Crear la funcionalidad extra

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            minimumPrice: '',
            valuationPercentagePrice: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            description: Yup.string()
                .required('description is required'),
            minimumPrice: Yup.string()
                .required('minimumPrice is required'),
            valuationPercentagePrice: Yup.string()
                .required('valuationPercentagePrice is required'),
        }),
        onSubmit: values => {
            RestService.createObject('/coverage', values)
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
        <div className="modal fade" id="createCoverageModal" tabindex="-1" aria-labelledby="createCoverageModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="createCoverageModalLabel">Create Coverages</h5>
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
                                {createErrors.filter((error) => error.field === "name").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "name").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="description" className="form-label mb-0 mt-3">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.description}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "description").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "description").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="minimumPrice" className="form-label mb-0 mt-3">Minimum Price</label>
                                <input
                                    id="minimumPrice"
                                    name="minimumPrice"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.minimumPrice}
                                />
                                {formik.touched.minimumPrice && formik.errors.minimumPrice && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.minimumPrice}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "minimumPrice").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "minimumPrice").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="valuationPercentagePrice" className="form-label mb-0 mt-3">Percentage Price</label>
                                <input
                                    id="valuationPercentagePrice"
                                    name="valuationPercentagePrice"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.valuationPercentagePrice}
                                />
                                {formik.touched.valuationPercentagePrice && formik.errors.valuationPercentagePrice && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.valuationPercentagePrice}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "valuationPercentagePrice").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "valuationPercentagePrice").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="modal-footer">
                                <input type="submit" className="btn btn-primary" value="Create Coverage Categories" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CoverageCreateModal