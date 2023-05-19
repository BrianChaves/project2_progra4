let preview_modal = document.getElementById('preview_modal');
preview_modal.addEventListener('click', (event) => {
    let quote_coverages =  document.getElementById('quote_coverages');
    let car_value =  document.getElementById('valuation').value;
    let car_number_plate_value = document.getElementById('numberPlate').value;
    let car_model = document.getElementById('vehicle').options[document.getElementById('vehicle').selectedIndex ].getAttribute('data-text');
    let payment_schedule = document.getElementById('paymentSchedule').options[document.getElementById('paymentSchedule').selectedIndex ].getAttribute('data-text');
    let payment_card = document.getElementById('payment').options[document.getElementById('payment').selectedIndex ].getAttribute('data-text');
    let quote_total_price =  document.getElementById('quote_total_price');
    let quote_payment_schedule_price = document.getElementById('quote_payment_schedule_price');

    let selected_coverages = [...document.getElementsByName('coverages')].filter(coverage => coverage.checked);
    let coverages = selected_coverages.map(coverage => ({
        id: coverage.id.split('_')[1],
        name: coverage.getAttribute('data-name'),
        price: coverage.getAttribute('data-minprice'),
        minimum_percentage: coverage.getAttribute('data-percentage')}));
    quote_coverages.innerHTML = '';
    console.log(coverages);
    coverages.forEach(coverage => {
        let coverage_tr = document.createElement('tr');
        let coverage_id_td = document.createElement('td');
        let coverage_name_td = document.createElement('td');
        let coverage_price_td = document.createElement('td');
        coverage_id_td.innerHTML = coverage.id;
        coverage_name_td.innerHTML = coverage.name;
        coverage_price_td.innerHTML = car_value*coverage.minimum_percentage/100 > coverage.price ? car_value*coverage.minimum_percentage/100 : coverage.price;

        coverage_tr.appendChild(coverage_id_td);
        coverage_tr.appendChild(coverage_name_td);
        coverage_tr.appendChild(coverage_price_td);
        quote_coverages.appendChild(coverage_tr);
    });
    document.getElementById('quote_car_model').innerText = car_model;
    document.getElementById('quote_number_plate').innerText = car_number_plate_value;
    document.getElementById('quote_payment').innerText = payment_card;
    document.getElementById('quote_payment_schedule').innerText = payment_schedule;
    document.getElementById('quote_payment_schedule_price').innerText = payment_schedule;
    let total_price = coverages.reduce((totalValue, coverage) => car_value*coverage.minimum_percentage/100 > coverage.price ? totalValue+parseInt(car_value*coverage.minimum_percentage/100) : totalValue+parseInt(coverage.price), 0);
    switch (payment_schedule){
        case 'Yearly':
            quote_payment_schedule_price.innerText = `One payment of ₡${total_price}`;
            break;
        case 'Biannual':
            quote_payment_schedule_price.innerText = `Two payments of ₡${total_price/2}`;
            break;
        case 'Quarterly':
            quote_payment_schedule_price.innerText = `Four payments of ₡${total_price/4}`;
            break;
    }
    quote_total_price.innerText = total_price;
});

document.getElementById('submit_form').addEventListener('click', (event) => {
   document.getElementById('insurance_form').submit();
});