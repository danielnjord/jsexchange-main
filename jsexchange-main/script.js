async function loadRates(baseCurrency) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/4ec6280b69e5b33f98212f13/latest/${baseCurrency}`);
    const data = await response.json();
    return data.conversion_rates;
}

async function updateRates() {
    const currencyOne = document.getElementById('currency-one').value;
    const currencyTwo = document.getElementById('currency-two').value;
    const amountOne = document.getElementById('amount-one').value;

    const rates = await loadRates(currencyOne);
    const rate = rates[currencyTwo];
    document.getElementById('rate').textContent = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

    const convertedAmount = (amountOne * rate).toFixed(2);
    document.getElementById('amount-two').value = convertedAmount;
}

function swapCurrencies() {
    const currencyOne = document.getElementById('currency-one');
    const currencyTwo = document.getElementById('currency-two');
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    updateRates();
}

document.getElementById('currency-one').addEventListener('change', updateRates);
document.getElementById('currency-two').addEventListener('change', updateRates);
document.getElementById('amount-one').addEventListener('input', updateRates);
document.getElementById('swap').addEventListener('click', swapCurrencies);

updateRates();
