import React, {useEffect, useState} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import RestService from '../../services/rest-service';

function CoverageUpdateModal({currentUser,coverageData}) {
    const [coverageCategoryList, setCoverageCategoryList] = useState([]);

    useEffect(() => {
        RestService.getObjectList('/coverage/category')
            .then((data) => {
                if (data != null){
                    console.log(data)
                    setCoverageCategoryList(data);
                }
            })
    }, [])
    const formik = useFormik({
        initialValues: {
            name: coverageData.name,
            description: coverageData.description,
            minimumPrice: coverageData.minimumPrice,
            valuationPercentagePrice: coverageData.valuationPercentagePrice,
            coverageCategory: coverageData.coverageCategory?.id,
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
            coverageCategory: Yup.string()
                .required('Required'),
        }),
        enableReinitialze: true,
        onSubmit: values => {
            RestService.updateObject(`/coverage/${coverageData.name}`, {...values, coverageCategory: parseInt(values.coverageCategory)})
                .then((data) => {
                    console.log(data);
                    window.location.replace('/coverage/');
                })

        },
    });
    return (
        <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Update Coverage</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                           < div>
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
                                    {coverageCategoryList.map((coverageCategory) => (
                                        <option 
                                            value={coverageCategory?.id}
                                            selected={coverageCategory?.id  === formik.values.coverageCategory} 
                                        >
                                            {coverageCategory?.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>No Coverage Category exist.</p>
                            )}

                            {formik.touched.coverageCategory && formik.errors.coverageCategory && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.coverageCategory}</div>
                                </div>
                            )}
                        </div>

                        </div>





                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary" value="Update Coverage" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CoverageUpdateModal