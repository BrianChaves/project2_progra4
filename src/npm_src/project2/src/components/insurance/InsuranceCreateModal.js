import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import RestService from '../../services/rest-service';
import { useFormik } from 'formik';
import InsurancePreviewQuoteModal from './InsurancePreviewQuoteModal';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

function InsuranceCreateModal() {
    const [vehicleList, setVehicleList] = useState([]);
    const [paymentScheduleList, setPaymentScheduleList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [coverageList, setCoverageList] = useState([]);
    const [previewButtonDisabled, setPreviewButtonDisabled] = useState(true);
    const [createErrors, setCreateErrors] = useState([]);
    
    const maxYear = new Date().getFullYear()+1;

    useEffect(() => {
        RestService.getObjectList('/vehicle')
        .then((data) => {
            if (data != null){
                setVehicleList(data);
            }
        })
        RestService.getObjectList('/paymentSchedule')
        .then((data) => {
            if (data != null){
                setPaymentScheduleList(data);
            }
        })
        RestService.getObjectList('/payment')
        .then((data) => {
            if (data != null){
                setPaymentList(data);
            }
        })
        RestService.getObjectList('/coverage')
        .then((data) => {
            if (data != null){
                setCoverageList(data);
            }
        })
    }, [])
    
    const formik = useFormik({
        initialValues: {
            numberPlate: '',
            carYear:1990,
            vehicle: null,
            valuation: null,
            paymentSchedule: null,
            payment: null,
            coverages: []
        },

        initialTouched: {
            numberPlate:true,
            carYear:true,
            vehicle:true,
            valuation:true,
            paymentSchedule:true,
            payment:true,
            coverages:true
        },
        validateOnMount: true,
        validationSchema: Yup.object({
            numberPlate: Yup.string()
                .required('Car number plate is required'),
            carYear: Yup.number()
                .min(1900, `The year of the car should not be less than 1900`)
                .max(maxYear, `The year of the car should not be greater than ${maxYear}`)
                .required('Car year is required'),
            vehicle: Yup.number()
                .required('Vehicle type is required'),
            valuation: Yup.number()
                .min(1, 'Valuation of the car must be greater than 0')
                .required('Valuation is required'),
            paymentSchedule: Yup.number()
                .required('Payment schedule is required'),
            payment: Yup.number()
                .required('Payment method is required'),
            coverages: Yup.array(Yup.number())
                .min(1, "At least one coverage should be selected."),
        }),
        onSubmit: values => {
            console.log(values);
        }
    });

    useEffect(() => {
        Object.keys(formik.errors).length === 0 
        ? setPreviewButtonDisabled(false)
        : setPreviewButtonDisabled(true);
    }, [formik.errors])

    useEffect(() => {
        if(createErrors.length !== 0){setCreateErrors([])};
    }, [formik.values])

    return (
        <>
        <div className="modal fade" id="createInsuranceModal" tabindex="-1" aria-labelledby="createInsuranceModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="createInsuranceModalLabel">Create Insurance</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label for="numberPlate" class="form-label col-12 fw-bold my-auto">Number Plate</label>
                                <input 
                                    id="numberPlate" 
                                    name="numberPlate" 
                                    type="text" 
                                    class="form-control" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numberPlate}
                                />
                                {formik.touched.numberPlate && formik.errors.numberPlate && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.numberPlate}</div>
                                </div>
                                )}
                            </div>
                            <div>
                                <br/>
                                <label for="carYear" class="form-label col-12 fw-bold my-auto">Year</label>
                                <input 
                                    id="carYear" 
                                    name="carYear" 
                                    type="number" 
                                    step="1"
                                    class="form-control" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.carYear}
                                />
                                {formik.touched.carYear && formik.errors.carYear && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.carYear}</div>
                                </div>
                                )}
                                <br/>
                            </div>
                            <div>
                                <label for="vehicle" class="form-label col-12 fw-bold my-auto">Brand-Model</label>
                                { vehicleList.length !== 0 ? (
                                <select 
                                    id="vehicle" 
                                    name="vehicle" 
                                    class="form-select d-inline" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.vehicle}
                                >
                                    <option selected>---</option>
                                    {vehicleList.map((vehicle) => <option value={vehicle.id}>{`${vehicle.brand} ${vehicle.model}`}</option>)}
                                </select>
                                ) : (
                                    <p>No vehicles exist.</p>
                                )}
                                {formik.touched.vehicle && formik.errors.vehicle && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.vehicle}</div>
                                </div>
                                )}
                            </div>
                            <div>
                                <label for="valuation" class="form-label col-12 fw-bold my-auto">Value (CRC)</label>
                                <input 
                                    id="valuation" 
                                    name="valuation" 
                                    type="text" 
                                    class="form-control"
                                    placeholder='Value in ₡' 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.valuation}
                                />
                                {formik.touched.valuation && formik.errors.valuation && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.valuation}</div>
                                </div>
                                )}
                            </div>
                            <div>
                                <label for="paymentSchedule" class="form-label col-12 fw-bold my-auto">Payment Schedule</label>
                                { paymentScheduleList.length !== 0 ? (
                                <select 
                                    id="paymentSchedule"
                                    name="paymentSchedule" 
                                    class="form-select d-inline" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.paymentSchedule}
                                >
                                    <option selected>---</option>
                                    {paymentScheduleList.map((paymentSchedule) => <option value={paymentSchedule.id}>{`${paymentSchedule.name}`}</option>)}
                                </select>
                                ) : (
                                    <p>No payment schedules exist.</p>
                                )}
                                {formik.touched.paymentSchedule && formik.errors.paymentSchedule && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.paymentSchedule}</div>
                                </div>
                                )}
                            </div>
                            <hr/>
                            <div>
                                <label for="payment" class="form-label col-12 fw-bold my-auto">Cards</label>
                                { paymentList.length !== 0 ? (
                                <select 
                                    id="payment" 
                                    name="payment" 
                                    class="form-select d-inline" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.payment}
                                >
                                    <option selected>---</option>
                                    {paymentList.map((payment) => <option value={payment.id}>{`${payment.safeNumber} (${payment.owner})`}</option>)}
                                </select>
                                ) : (
                                    <p>No payments exist.</p>
                                )}
                                {formik.touched.payment && formik.errors.payment && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.payment}</div>
                                </div>
                                )}
                            </div>
                            <h5>Coverages</h5>
                            <div class="row col-12 justify-content=between">
                                { coverageList.length !== 0 ? 
                                coverageList.map(coverage => (
                                    <div class="col-4">
                                        <input
                                            id={`coverage_${coverage.id}`}
                                            class="form-check-input" 
                                            type="checkbox" 
                                            name="coverages" 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={coverage.id}
                                            data-name={coverage.name} 
                                            data-minprice={coverage.minimumPrice} 
                                            data-percentage={coverage.valuationPercentagePrice} 
                                        />
                                        <label class="form-check-label" htmlFor={`coverage_${coverage.id}`}>{coverage.name}</label>
                                    </div>
                                )
                                ) : (
                                    <p>No coverages exist.</p>
                                )}
                                {formik.touched.coverages && formik.errors.coverages && (
                                <div className="alert alert-danger mb-0 mt-1 p-1 ps-4">
                                    <div className="error">{formik.errors.coverages}</div>
                                </div>
                                )}
                            </div>
                        </div>
                    </form>
                    { previewButtonDisabled && (
                        <p class="alert alert-warning mt-3">Please fill the form correctly to proceed to insurance preview.</p>
                    )}
                    <div class="row col-12 justify-content-center mt-3">
                        <button
                            id="preview_modal" 
                            type="button"
                            class="btn btn-lg col-4 btn-primary fw-bold mb-2" 
                            data-bs-toggle="modal" 
                            data-bs-target="#previewQuoteModal" 
                            data-bs-dismiss="modal"
                            disabled={previewButtonDisabled}
                        >
                            Preview Insurance
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <InsurancePreviewQuoteModal 
            formik={formik} 
            vehicleList={vehicleList} 
            coverageList={coverageList} 
            paymentScheduleList={paymentScheduleList} 
            paymentList={paymentList}
            createErrors={createErrors}
            setCreateErrors={setCreateErrors}
        />
        </>
    )
}

export default InsuranceCreateModal