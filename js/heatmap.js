const API_URL = 'https://phisix-api.appspot.com/stocks.json';
const stockInfo = 'https://www.pse.com.ph/company-information-abg/'

const symbol = document.getElementById('stock-symbol');
const name = document.getElementById('stock-name');
const price = document.getElementById('stock-price');
const volume = document.getElementById('stock-volume');
const change = document.getElementById('stock-change');
const date = document.getElementById('date');

const container = document.querySelector('.heatmap-container');

const all = document.getElementById('all');
const gain = document.getElementById('gain');
const loss = document.getElementById('loss');

async function getAll() {
    const res = await fetch(API_URL);
    const data = await res.json();

    showDate(data);
    displayAll(data);
}

async function getGreen() {
    const res = await fetch(API_URL);
    const data = await res.json();

    showDate(data);
    displayGreen(data);
}

getAll();

// Event Listeners
// all.addEventListener('click', () => {
//     getAll();
// })

// gain.addEventListener('click', () => {
//     getGreen();
// })

// Functions
function showDate(data) {
    const objDate = data.as_of;
    date.innerHTML = `Updated: ${objDate.slice(0, 10)}`;
}

function displayAll(data) {
    const obj = data.stock;

    for (let i = 0; i < obj.length; i++) {
        const { symbol, name, price, volume, percent_change } = obj[i];
        const stockData = document.createElement('div');

        stockData.classList.add('stock-container');
        stockData.innerHTML =

            `
            <li id="stock-symbol"><a href='https://www.pse.com.ph/company-information-${symbol}/'>${symbol}</a></li>
            <li id="stock-price">PHP ${price.amount.toFixed(2)}</li>
            <li id="stock-change">${percent_change.toFixed(2)}%</li>

            <div class="stock-info">
            <li id="stock-name">${name}</li>
            <li id="stock-volume">Volume: ${volume.toLocaleString()}</li>
            </div>
            `

        container.appendChild(stockData);

        if (percent_change > 0) {
            stockData.classList.add('change-increase');
        } else {
            stockData.classList.add('change-decrease');
        }
    }
}

function displayGreen(data) {
    const arr = data.stock;
    let res = arr.filter(function (e) {
        return e.percent_change > 0;
    })

    for (let i = 0; i < res.length; i++) {
        const { symbol, name, price, volume, percent_change } = res[i];

        const stockData = document.createElement('div');
        stockData.classList.add('stock-container');
        stockData.classList.add('change-increase');
        stockData.innerHTML =

            `
        <li id="stock-symbol"><a href='https://www.pse.com.ph/company-information-${symbol}/'>${symbol}</a></li>
        <li id="stock-price">PHP ${price.amount.toFixed(2)}</li>
        <li id="stock-change">${percent_change.toFixed(2)}%</li>

        <div class="stock-info">
        <li id="stock-name">${name}</li>
        <li id="stock-volume">Volume: ${volume.toLocaleString()}</li>
        </div>
        `

        container.appendChild(stockData);
    }
}









