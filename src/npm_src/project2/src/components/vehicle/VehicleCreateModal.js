import React, { useEffect, useState } from 'react'
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import RestService from '../../services/rest-service';

function VehicleCreateModal({vehicleList}) {
    const [createErrors, setCreateErrors] = useState([]);
    const [selectedImage, setSelectedImage] = useState(undefined);
    const formData = new FormData();

    const handleImageChange = (event) => {
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
        formik.handleChange(event);
    };

    const formik = useFormik({
        initialValues: {
            brand: '',
            model: '',
            image: null,
        },
        validationSchema: Yup.object({
            brand: Yup.string()
                .required('Brand is required'),
            model: Yup.string()
                .required('Model is required'),
            image: Yup.mixed()
                .required('Image is required'),
        }),
        onSubmit: values => {
            formData.append("brand", values.brand);
            formData.append("model", values.model);
            formData.append("image", selectedImage);
            console.log(formData)
            console.log(selectedImage);
            RestService.createObject('/vehicle', formData)
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
        <div className="modal fade" id="createVehicleModal" tabindex="-1" aria-labelledby="createVehicleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="createVehicleModalLabel">Create Vehicle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="brand" className="form-label mb-0 mt-3">Brand</label>
                                <input
                                    list="brandDatalistOptions" 
                                    id="brandDataList" 
                                    name='brand'
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.brand}
                                />
                                <datalist id="brandDatalistOptions">
                                    {vehicleList.length > 0 && (
                                        vehicleList.filter((item, index) => vehicleList.indexOf(item) === index).map((vehicle) => {
                                            return <option value={vehicle.brand}></option>})
                                    )}
                                </datalist>
                                {formik.touched.brand && formik.errors.brand && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.brand}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "brand").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "brand").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="model" className="form-label mb-0 mt-3">Model</label>
                                <input
                                    id="model"
                                    name="model"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.model}
                                />
                                {formik.touched.model && formik.errors.model && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.model}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "model").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "model").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="image" className="form-label mb-0 mt-3">Image</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.image}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                        <div className="error">{formik.errors.image}</div>
                                    </div>
                                )}
                                {createErrors.filter((error) => error.field === "image").length > 0 && (
                                    <ul class="alert alert-danger ps-4">
                                        {createErrors.filter((error) => error.field === "image").map((error)=> (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {selectedImage && (
                            <div>
                                <img
                                    alt="Not Found"
                                    width={"120px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <button class="btn btn-secondary btn-sm mb-2" onClick={() => setSelectedImage(undefined)}>Remove</button>
                            </div>
                            )}
                            <div className="modal-footer">
                                <input type="submit" className="btn btn-primary" value="Create Vehicle" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VehicleCreateModal;