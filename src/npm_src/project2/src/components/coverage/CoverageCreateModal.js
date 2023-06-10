import React, { useEffect, useState } from 'react'
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import RestService from '../../services/rest-service';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

function CoverageCreateModal() {
    const [coverageCategoryList, setCoverageCategoryList] = useState([]);
    const [createErrors, setCreateErrors] = useState([]);

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    })
      
    useEffect(() => {
        RestService.getObjectList('/coverage/category')
            .then((data) => {
                if (data != null){
                    setCoverageCategoryList(data);
                }
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            minimumPrice: 0,
            valuationPercentagePrice: 0,
            coverageCategory: 0,

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
            coverageCategory: Yup.number()
                .required('Required'),
        }),
        onSubmit: values => {
            RestService.createObject('/coverage', {...values, coverageCategory: parseInt(values.coverageCategory)})
                .then((data) => {
                    window.location.reload();
                    setCreateErrors([]);
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
                                <label htmlFor="minimumPrice" className="form-label mb-0 mt-3">
                                    Minimum Price
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Minimum price of the coverage, the higher value between minimum price and percentage price will be the one that takes effect" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>    
                                </label>
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
                                <label htmlFor="valuationPercentagePrice" className="form-label mb-0 mt-3">
                                    Percentage Price
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Price of the coverage as a percentage of the car's valuation, the higher value between minimum price and percentage price will be the one that takes effect" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>    
                                </label>
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

                            <div>
                                <label htmlFor="coverageCategory" className="form-label mb-0 mt-3">Coverage Category: </label>
                                {coverageCategoryList.length !== 0 ? (
                                    <select
                                        id="coverageCategory"
                                        name="coverageCategory"
                                        className="form-select form-select-sm"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.coverageCategory}
                                    >
                                        <option>---</option>
                                        {coverageCategoryList.map((coverageCategory) => <option value={coverageCategory.id}>{coverageCategory.name}</option>)}
                                    </select>
                                ) : (
                                    <p>No Coverage Category exist.</p>
                                )}
                                {formik.touched.coverageCategory && formik.errors.coverageCategory && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.coverageCategory}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "coverageCategory").length > 0 && (
                                    <ul className="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "coverageCategory").map((error) => (
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