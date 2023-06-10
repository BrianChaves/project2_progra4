import React, { useEffect, useState } from 'react'
import RestService from '../../services/rest-service';

function InsurancePreviewQuoteModal({formik, vehicleList, coverageList, paymentScheduleList, paymentList, createErrors, setCreateErrors}) {
    const [paymentSchedule, setPaymentSchedule] = useState({});
    const [payment, setPayment] = useState({});

    const handleQuoteCreate = () => {
        let data = {
            carYear: formik.values.carYear,
            numberPlate: formik.values.numberPlate,
            valuation: formik.values.valuation,
            payment: parseInt(formik.values.payment),
            paymentSchedule: parseInt(formik.values.paymentSchedule),
            vehicle: parseInt(formik.values.vehicle),
            coverages: formik.values.coverages.map(id => parseInt(id))
        }
        RestService.createObject('/insurance', data)
        .then((data) => {
            setCreateErrors([]);
            window.location.reload();
        })
        .catch((data) => {
            const errors = data.map((error) => ({field: error.field, message: error.defaultMessage}));
            setCreateErrors(errors);
        })
    }

    useEffect(() => {
        paymentScheduleList && setPaymentSchedule(paymentScheduleList.filter((schedule) => {
            return formik.values.paymentSchedule === schedule.id.toString();
        })[0]);
    }, [formik.values.paymentSchedule, paymentScheduleList])

    useEffect(() => {
        paymentList && setPayment(paymentList.filter((payment) => {
            return formik.values.payment === payment.id.toString();
        })[0]);
    }, [formik.values.payment, paymentList])

    return (
        <div class="modal-body">
            <div id="preview_quote">
            <p>Number Plate: <span id="quote_number_plate">{formik.values.numberPlate}</span></p>
            {createErrors.filter((error) => error.field === "numberPlate").length > 0 && (
                <ul class="alert alert-danger ps-4">
                    {createErrors.filter((error) => error.field === "numberPlate").map((error)=> (
                        <li>{error.message}</li>
                    ))}
                </ul>
            )}
            <p>Payment: <span id="quote_payment">{payment?.safeNumber} ({payment?.owner})</span></p>
            {createErrors.filter((error) => error.field === "payment").length > 0 && (
                <ul class="alert alert-danger ps-4">
                    {createErrors.filter((error) => error.field === "payment").map((error)=> (
                        <li>{error.message}</li>
                    ))}
                </ul>
            )}
            <p>Payment Schedule: <span id="quote_payment_schedule">{paymentSchedule?.name}</span></p>
            {createErrors.filter((error) => error.field === "paymentSchedule").length > 0 && (
                <ul class="alert alert-danger ps-4">
                    {createErrors.filter((error) => error.field === "paymentSchedule").map((error)=> (
                        <li>{error.message}</li>
                    ))}
                </ul>
            )}
            <p>Car: <span id="quote_car_model">{vehicleList.filter((vehicle) => vehicle.id.toString() === formik.values.vehicle).map((vehicle) => `${formik.values.carYear} ${vehicle.brand} ${vehicle.model}`)}</span></p>
            {createErrors.filter((error) => error.field === "vehicle").length > 0 && (
                <ul class="alert alert-danger ps-4">
                    {createErrors.filter((error) => error.field === "vehicle").map((error)=> (
                        <li>{error.message}</li>
                    ))}
                </ul>
            )}
            <p>Coverages</p>
            <table class="table table-sm table-bordered table-striped table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Coverage</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody id="quote_coverages">
                {formik.values.coverages.length > 0 && coverageList.filter((coverage) => formik.values.coverages.includes(coverage.id.toString())).map((coverage) => (
                    <tr>
                        <td>{coverage.id}</td>
                        <td>{coverage.name}</td>
                        <td>₡{parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100 > coverage.minimumPrice ? parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100 : coverage.minimumPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h5>Payment Plan: 
                <span id="quote_payment_schedule_price">
                        ₡
                    {paymentSchedule?.name === "Yearly" && formik.values.coverages.length > 0 && coverageList.filter((coverage) => formik.values.coverages.includes(coverage.id.toString())).reduce((totalValue, coverage) => parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100 > coverage.minimumPrice ? totalValue+parseInt(parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100) : totalValue+parseInt(coverage.minimumPrice), 0)}
                    {paymentSchedule?.name === "Biannual" && formik.values.coverages.length > 0 && coverageList.filter((coverage) => formik.values.coverages.includes(coverage.id.toString())).reduce((totalValue, coverage) => parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100 > coverage.minimumPrice ? totalValue+parseInt(parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100) : totalValue+parseInt(coverage.minimumPrice), 0)/2}
                    {paymentSchedule?.name === "Quarterly" && formik.values.coverages.length > 0 && coverageList.filter((coverage) => formik.values.coverages.includes(coverage.id.toString())).reduce((totalValue, coverage) => parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100 > coverage.minimumPrice ? totalValue+parseInt(parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100) : totalValue+parseInt(coverage.minimumPrice), 0)/4}
                        ({paymentSchedule?.name})
                </span>
            </h5>
            <h5>Total Price: 
                <span id="quote_total_price">
                        ₡{formik.values.coverages.length > 0 && coverageList.filter((coverage) => formik.values.coverages.includes(coverage.id.toString())).reduce((totalValue, coverage) => parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100 > coverage.minimumPrice ? totalValue+parseInt(parseInt(formik.values.valuation)*coverage.valuationPercentagePrice/100) : totalValue+parseInt(coverage.minimumPrice), 0)}
                </span>
            </h5>
            </div>
            <div class="row col-12 justify-content-center mt-3">
                <button type="button" class="btn btn-lg col-4 btn-primary fw-bold mb-2" onClick={handleQuoteCreate}>Add Insurance</button>
            </div>
        </div>
    )
}

export default InsurancePreviewQuoteModal