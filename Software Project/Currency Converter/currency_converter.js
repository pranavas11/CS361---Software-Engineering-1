let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let result = document.querySelector(".result");
let clear = document.querySelector(".clear");

let options = document.querySelectorAll(".options select");
let option1 = options[0];
let option2 = options[1];

let input = document.querySelectorAll(".input input");
let input1 = input[0];
let input2 = input[1];

let rates = {};
let data = {};

const api_url = "https://v6.exchangerate-api.com/v6/5a9d162dd5f3cf2295879f06/latest/USD";

fetch_rates();

async function fetch_rates() {
    let response = await fetch(api_url);
    response = await response.json();
    rates = response.conversion_rates;
    fill_options();
}

function fill_options() { // fill the dropdown menu with a list of currency options
    let val = "";
    Object.keys(rates).forEach((rate) => {
        let currency_code = `<option value="${rate}">${rate}</option>`;
        val += currency_code;
    })
    options.forEach((option) => (option.innerHTML = val));
}

function convert_rates(val, from_currency, to_currency) {
    // formula: (val / rate_of_initial_currency) * rate_of_target_currency
    let currency_value = (val / rates[from_currency]) * rates[to_currency];
    let precised_value = currency_value.toFixed(5);
    return precised_value;
}

function display_currency() {
    let currency1 = option1.value; // get currency choice 1
    let currency2 = option2.value; // get currency choice 2

    input1.disabled = false;

    if (currency1 == currency2) {
        alert("You cannot select the same two currencies.");
        input1.value = '';
        input2.value = '';
        input1.disabled = true;
        currency1 = option1.value;
        currency2 = option2.value;

        rate1.innerHTML = `<b>1 ${currency1} EQUALS</b>`;
        rate2.innerHTML = `<b>1 ${currency2}</b>`;
    }

    data.currency1 = currency1;
    data.currency2 = currency2;
    //console.log(JSON.stringify(data));

    // fetch user selected currency choices to be sent to "currency_server.js", where the data will be written to "currency.json"
    fetch("/json_data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    let val = convert_rates(1, currency1, currency2);

    rate1.innerHTML = `<b>1 ${currency1} EQUALS</b>`;
    rate2.innerHTML = `<b>${val} ${currency2}</b>`;
}

function get_user_currency_choice() {
    let currency1 = option1.value;
    let currency2 = option2.value;

    let fetch_data = fetch("/data.json");
    fetch_data.then(res =>
        res.json()).then(curr_data => {
        document.getElementById("c1").innerHTML = curr_data[currency1]; // write currency 1 info to the webpage
        document.getElementById("c2").innerHTML = curr_data[currency2]; // write currency 2 info to the webpage
    })
}

// "Submit" button event listener
result.addEventListener("click", () => {
    let from_currency = option1.value;
    let from_value = parseFloat(input1.value);
    let to_currency = option2.value;

    if (isNaN(from_value)) {
        alert("Enter a number.");
    } else {
        let conversion_rate = convert_rates(from_value, from_currency, to_currency);
        input2.value = conversion_rate;
    }
})

// "Clear" button event listener
clear.addEventListener("click", () => {
    let text = "Are you sure you want to clear the fields?";
    if (confirm(text) == true) {
        option1.value = 'USD';
        option2.value = 'USD';
        input1.value = '';
        input2.value = '';
        rate1.innerHTML = '';
        rate2.innerHTML = '';
        document.getElementById("c1").innerHTML = "";
        document.getElementById("c2").innerHTML = "";
    }
})

// get updated currency data for each user selection
options.forEach(change => change.addEventListener("change", display_currency));
options.forEach(change => change.addEventListener("change", get_user_currency_choice));

// "Swap" button event listener
document.querySelector(".swap").addEventListener("click", () => {
    let opt1 = option1.value;
    let opt2 = option2.value;
    let inp1 = input1.value;
    let inp2 = input2.value;

    // swap the two options
    option2.value = opt1;
    option1.value = opt2;

    // swap the two inputs
    input2.value = inp1;
    input1.value = inp2;

    display_currency();
    get_user_currency_choice();
})

/*
API Link: https://api.exchangerate.host/latest?base=USD
*/

// Project Video Demo: https://media.oregonstate.edu/media/t/1_ves6ijrq