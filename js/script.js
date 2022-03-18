const quote = document.getElementById('quote-text');
const author = document.getElementById('quote-author');
const API_URL = 'https://type.fit/api/quotes';

async function getQuote() {
    const res = await fetch(API_URL);
    const data = await res.json();

    displayQuote(data);

}

getQuote();

function displayQuote(data) {
    const randomQuote = data[Math.floor(Math.random() * data.length)];

    quote.innerHTML = randomQuote.text;
    author.innerHTML = `- ${randomQuote.author}`;
}