import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import RestService from '../../services/rest-service';
import { useFormik } from 'formik';
import InsurancePreviewQuoteModal from './InsurancePreviewQuoteModal';

function InsuranceCreateModal() {
    const [vehicleList, setVehicleList] = useState([]);
    const [paymentScheduleList, setPaymentScheduleList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [coverageList, setCoverageList] = useState([]);
    const [previewButtonDisabled, setPreviewButtonDisabled] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [createErrors, setCreateErrors] = useState([]);
    
    const maxYear = new Date().getFullYear()+1;
    const previewInsurance = () => {
        if (Object.keys(formik.errors).length === 0){
            setShowPreview(true);
        }else{
            setShowPreview(false);
        }
    }
    
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
                                <label for="vehicle" class="form-label col-12 fw-bold my-auto">Car Model</label>
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
                                <label for="valuation" class="form-label col-12 fw-bold my-auto">
                                    Value (CRC)
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Car valuation in the current year" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>    
                                </label>
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
                                <label for="paymentSchedule" class="form-label col-12 fw-bold my-auto">
                                    Payment Schedule
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Payment can be done as a one-time annual payment, or broken down into two or four payments through the year" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>
                                </label>
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
                                <label for="payment" class="form-label col-12 fw-bold my-auto">
                                    Cards
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Payment method, your card will be charged after insurance creation is complete" class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>    
                                </label>
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
                                        <label class="form-check-label" htmlFor={`coverage_${coverage.id}`}>
                                            {coverage.name}
                                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title={`${coverage.description}`} class="ps-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></a>
                                        </label>
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
                            class="btn btn-lg col-4 btn-secondary fw-bold mb-2"
                            disabled={previewButtonDisabled}
                            onClick={previewInsurance}
                        >
                            Preview Insurance
                        </button>
                    </div>
                    <hr/>
                    { showPreview && !previewButtonDisabled && (
                    <InsurancePreviewQuoteModal 
                        formik={formik} 
                        vehicleList={vehicleList} 
                        coverageList={coverageList} 
                        paymentScheduleList={paymentScheduleList} 
                        paymentList={paymentList}
                        createErrors={createErrors}
                        setCreateErrors={setCreateErrors}
                    />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default InsuranceCreateModal